import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { addItem } from '../../actions/actions';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withFormik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import classes from './customer.module.css';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

class Customer extends Component
{

	render()
	{
		return (

			<Container style={{ marginTop: '50px' }}>
				<Grid container spacing={3}>
					<Grid item xs={12} item md={6}>
						<Paper className={useStyles.paper}>
							<h3>zulieferer Hinzufügen</h3>
							<div style={{ textAlign: 'center' }}>
								<Form className={classes.form}>

									<p><ErrorMessage name="name" /></p>
									<Field type="text" name="name"
										placeholder="Enter your name *" /><br />
									<p><ErrorMessage name="website" /></p>
									<Field type="text" name="website" placeholder="Enter your website" /><br />
									<p><ErrorMessage name="email" /></p>
									<Field component="textarea" name="comments" placeholder="Enter comments!" /><br />
									<p><ErrorMessage name="comments" /></p>
									<Field type="text" name="lieferzeit" placeholder="Enter lieferzeit" /><br />
									<p><ErrorMessage name="lieferzeit" /></p>
								</Form>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={12} item md={6}>
						<Paper className={useStyles.paper}>
							<h3>Contact Person</h3>
							<div style={{ textAlign: 'center' }}>

								<Form className={classes.form}>
									<label><b> Anrede: <span>*</span></b></label>

									<br />
									<label><b> HERR:</b></label>
									<input type="radio" name="test" value="M" checked={this.props.values.test === "M"}
										onChange={() => this.props.setFieldValue("test", "M")} />
									<label><b>FRAU :</b></label>

									<input type="radio" name="test" value="F" checked={this.props.values.test === "F"}
										onChange={() => this.props.setFieldValue("test", "F")} />
									<br />

									<p><ErrorMessage name="firstname" /></p>
									<Field type="text" name="firstname" placeholder="Enter your firstname *" required="required" />
									<p><ErrorMessage name="lastname" /></p>
									<Field type="text" name="lastname" placeholder="Enter your lastname *" required="required" />
									<Field type="text" name="position" placeholder="Enter your postion" />
									<Field type="text" name="language" placeholder="Enter your language" />

									<Field type="text" name="telephone" placeholder="Enter your telephone number *" required="required" />
									<p><ErrorMessage name="telephone" /></p>

									<Field type="text" name="email" placeholder="Enter your email *" required="required" />
									<p><ErrorMessage name="email" /></p>

								</Form>
							</div>
						</Paper>
					</Grid>

					<Grid item xs={12} item md={12}>
						<Paper className={useStyles.paper} style={{ textAlign: 'center' }}>
							<Form><button type='submit'> Hinzufügen </button>
							</Form> </Paper></Grid>
				</Grid>
			</Container>
		)
	}
}

// formik HOC 

const Formikapp = withFormik({

	mapPropsToValues(props)
	{

		return {
			name: props.name || '',
			website: props.website || '',
			comments: props.comments || '',
			lieferzeit: props.lieferzeit || '',
			salutation: props.test || '',
			firstname: props.firstname || '',
			lastname: props.lastname || '',
			position: props.position || '',
			language: props.language || '',
			telephone: props.telephone || '',
			email: props.email || '',
		}
	},
	// form validation using Yup
	validationSchema: Yup.object().shape({
		name: Yup.string().min(5).required('* name is required !'),
		website: Yup.string().url().required('* website must be a valid URL "http://www.google.com"'),
		comments: Yup.string().min(10).required('* comments are required min 10 characters !'),
		lieferzeit: Yup.number().min(1).required('* lieferzeit must greater than zero !'),
		firstname: Yup.string().min(5).required('* name is required !'),
		lastname: Yup.string().min(4).required('* last name is required!'),
		telephone: Yup.number().min(6).required('phone number must be 6 digits'),
		email: Yup.string().email().required('* email must be in "@gmail.com"')
	}),
	handleSubmit: (values, { setSubmitting, resetForm, props }) =>
	{
		// sending the data object to redux thunk for api call
		const data = {
			_id: Math.random(),
			createdAt: '',
			modifiedAt: '',
			name: values.name,
			website: values.website,
			internalComments: '',
			deliveryTime: 14,
			minimumOrder: 600,
			contacts: [
				{
					_id: Math.random(),
					salutation: values.test,
					firstName: values.firstname,
					lastName: values.lastname,
					position: values.position,
					spokenLanguage: values.language,
					phone: values.telephone,
					email: values.email,
				}]
		}

		setTimeout(() =>
		{
			setSubmitting(false);
			console.log(data)
			// sending to redux thunk
			props.addItem(data)
			alert('the customer data has been added !')
			resetForm();
		}, 1000);
	}
})(Customer);

const mapStateToProps = (state) => ({
	item: state.item
});

export default connect(mapStateToProps, { addItem })(Formikapp);

