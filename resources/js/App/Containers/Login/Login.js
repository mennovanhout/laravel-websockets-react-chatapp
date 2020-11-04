import React, {Component} from 'react';
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: null,
            form: 'login',
            loading: false,
            email: '',
            register: {
                errors: null,
                username: '',
                password: '',
                password_confirmation: ''
            },
            login: {
                errors: null,
                password: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === 'email') {
            this.setState({email: event.target.value});

            return;
        }

        const values = {...this.state[this.state.form] };

        values[event.target.name] = event.target.value;

        this.setState({[this.state.form]: values});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({loading: true, success: null});

        const values = this.state[this.state.form];
        values.email = this.state.email;
        delete values.errors;

        axios.get('/sanctum/csrf-cookie', { baseURL: ''}).then(res => {
            axios.post(`/${this.state.form}`, values, { baseURL: ''}).then(response => {
                Object.keys(values).forEach(name => {
                   values[name] = '';
                });
                values.errors = null;

                if (this.state.form === 'login') {
                    // Login success
                    this.props.onSuccessfulLogin(response.data);
                } else {
                    // Register success
                    this.setState({form: 'login', register: values, loading: false, success: response.data.message});
                }
            }).catch(error => {
                if (error.response?.status === 422) {
                    const form = {...this.state[this.state.form] };
                    form.errors = error.response.data.errors;

                    this.setState({[this.state.form]: form, loading: false});
                } else {
                    console.log(error.message);
                }
            });
        }).catch(error => {
            //@TODO: Serverside error
            console.log(error);
        });
    }

    render() {
        let fields = (<>
            <TextField name="email" error={typeof this.state.login.errors?.email !== 'undefined'} helperText={typeof this.state.login.errors?.email !== 'undefined' ? this.state.login.errors?.email[0] : null} variant="outlined" size="small" type="email" label="E-mail" onChange={this.handleChange} value={this.state.email} fullWidth />
            <TextField name="password" error={typeof this.state.login.errors?.password !== 'undefined'} helperText={typeof this.state.login.errors?.password !== 'undefined' ? this.state.login.errors?.password[0] : null}  variant="outlined" size="small" type="password" label="Password" onChange={this.handleChange} value={this.state.login.password} fullWidth />
            </>);

        if (this.state.form === 'register') {
            fields = (<>
                <TextField name="email" error={typeof this.state.register.errors?.email !== 'undefined'} helperText={typeof this.state.register.errors?.email !== 'undefined' ? this.state.register.errors?.email[0] : null} variant="outlined" size="small" type="email" label="E-mail" onChange={this.handleChange} value={this.state.email} fullWidth />
                <TextField name="username" error={typeof this.state.register.errors?.username !== 'undefined'} helperText={typeof this.state.register.errors?.username !== 'undefined' ? this.state.register.errors?.username[0] : null}  variant="outlined" size="small" label="Username" onChange={this.handleChange} value={this.state.register.username} fullWidth />
                <TextField name="password" error={typeof this.state.register.errors?.password !== 'undefined'} helperText={typeof this.state.register.errors?.password !== 'undefined' ? this.state.register.errors?.password[0] : null} variant="outlined" size="small" type="password" label="Password" onChange={this.handleChange} value={this.state.register.password} fullWidth />
                <TextField name="password_confirmation" variant="outlined" size="small" type="password" label="Password confirmation" onChange={this.handleChange} value={this.state.register.password_confirmation} fullWidth />
            </>);
        }

        let successMessage = null;

        if (this.state.success) {
            successMessage = (
                <Alert severity="success" style={{marginTop: '10px', marginBottom: '10px'}}>
                    <AlertTitle>Success</AlertTitle>
                    {this.state.success}
                </Alert>);
        }

        return (
                <div className="loginPage">
                    <Card className="loginContainer">
                        <form onSubmit={this.handleSubmit} noValidate>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {this.state.form.charAt(0).toUpperCase() + this.state.form.slice(1)}
                                </Typography>
                                {successMessage}
                                {fields}
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" size="small" type="submit" disabled={this.state.loading}>{this.state.loading ? <CircularProgress size="22px" /> : this.state.form}</Button>
                                <Button variant="text" onClick={() => this.setState({form: this.state.form === 'login' ? 'register' : 'login'})} disabled={this.state.loading}>{ this.state.form === 'login' ? 'I don\'t have an account!' : 'I already have an account!'}</Button>
                            </CardActions>
                        </form>
                    </Card>
                </div>
            );
    }
}

export default Login;
