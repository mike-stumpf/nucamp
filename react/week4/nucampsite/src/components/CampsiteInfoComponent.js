import React, { Component } from 'react';
import {
 Card,
 CardImg,
 CardText,
 CardBody,
 Breadcrumb,
 BreadcrumbItem,
 Button,
 Modal,
 ModalHeader,
 ModalBody, Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";

function RenderCampsite({campsite}) {
 return (
   <div className="col-md-5 ">
    <Card>
     <CardImg top src={campsite.image} alt={campsite.name} />
     <CardBody>
      <CardText>{campsite.description}</CardText>
     </CardBody>
    </Card>
   </div>
 )
}

function RenderComments({comments}) {
 if (comments) {
  return (
    <div className="col-md-5 m-1">
     <h4>Comments</h4>
     {
      comments.map((comment) =>
        <p key={comment.id}>{comment.text}<br/>
         --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
      )
     }
     <CommentForm/>
    </div>
  )
 }
 return <div/>
}

class CommentForm extends Component {
 constructor(props) {
  super(props);

  this.state = {
   isModalOpen: false,
   rating: '',
   author: '',
   text: '',
  };

  this.toggleModal = this.toggleModal.bind(this);
 }

 toggleModal() {
  this.setState({
   isModalOpen: !this.state.isModalOpen
  });
 }

 handleSubmit(values) {
  console.log("Current state is: " + JSON.stringify(values));
  alert("Current state is: " + JSON.stringify(values));
 }

 render() {
  const required = val => val && val.length;
  const maxLength = len => val => !val || (val.length <= len);
  const minLength = len => val => val && (val.length >= len);
  return <React.Fragment>
   <Button outline={true} onClick={this.toggleModal}>
    <i className="fa fa-lg fa-pencil"/>&nbsp;
    Submit Comment
   </Button>
   <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
    <ModalBody>
     <LocalForm onSubmit={values => this.handleSubmit(values)}>
      <Row className="form-group">
       <Label htmlFor="rating" md={2}>Rating</Label>
       <Col md={10}>
        <Control.select model=".rating" id="rating" name="rating"
                      placeholder="Rating"
                      className="form-control"
                      validators={{
                       required
                      }}
        >
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
        </Control.select>
        <Errors
          className="text-danger"
          model=".rating"
          show="touched"
          component="div"
          messages={{
           required: 'Required'
          }}
        />
       </Col>
      </Row>
      <Row className="form-group">
       <Label htmlFor="author" md={2}>Your Name</Label>
       <Col md={10}>
        <Control.text model=".author" id="author" name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                       required,
                       minLength: minLength(2),
                       maxLength: maxLength(15)
                      }}
        />
        <Errors
          className="text-danger"
          model=".author"
          show="touched"
          component="div"
          messages={{
           required: 'Required',
           minLength: 'Must be at least 2 characters',
           maxLength: 'Must be 15 characters or less'
          }}
        />
       </Col>
      </Row>
      <Row className="form-group">
       <Label htmlFor="text" md={2}>Comment</Label>
       <Col md={10}>
        <Control.textarea model=".text" id="text" name="text"
                      placeholder=""
                      className="form-control"
                      validators={{
                       required,
                      }}
        />
        <Errors
          className="text-danger"
          model=".text"
          show="touched"
          component="div"
          messages={{
           required: 'Required',
          }}
        />
       </Col>
      </Row>
      <Row className="form-group">
       <Col md={{size: 10, offset: 2}}>
        <Button type="submit" color="primary">
         Submit
        </Button>
       </Col>
      </Row>
     </LocalForm>
    </ModalBody>
   </Modal>
  </React.Fragment>
 }
}

function CampsiteInfo(props) {
 if (props.campsite) {
  return (
    <div className="container">
     <div className="row">
      <div className="col">
       <Breadcrumb>
        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
       </Breadcrumb>
       <h2>{props.campsite.name}</h2>
       <hr />
      </div>
     </div>
     <div className="row">
      <RenderCampsite campsite={props.campsite} />
      <RenderComments comments={props.comments} />
     </div>
    </div>
  );
 }
 return <div />;
}

export default CampsiteInfo;