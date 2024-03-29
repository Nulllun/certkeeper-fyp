import React, { Component } from 'react';
import '../main.css';
import Button from 'react-bootstrap/Button';

export default class CertVerifier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certID: '',
            cert: null,
            verifyResult: '',
        };
        this.handleInput = this.handleInput.bind(this);
        this.verifyCert = this.verifyCert.bind(this);
    }

    async verifyCert() {
        let certID = this.state.certID;
        console.log(`Request is sent with {"certID": ${certID}}`);
        if (certID !== '') {
            let path = 'http://localhost:5000/verify';
            let response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    certID: certID
                }),
            });
            let data = await response.json();
            console.log(data);
            if (response.status === 200) {
                this.setState({ cert: data.cert, verifyResult: data.verifyResult });
            }
        }
    }

    handleInput(event) {
        this.setState({ certID: event.target.value })
    }

    renderCert(cert) {
        if (cert !== null) {
            return (
                <div className="certificate">
                    <p>Certificate ID: {cert.certID}</p>
                    <p>Issue Platform: {cert.issuePlatform}</p>
                    <p>Institution: {cert.institution}</p>
                    <p>Title: {cert.courseTitle}</p>
                    <p>Description: {cert.courseDescription}</p>
                    <p>TeacherID: {cert.teacherID}</p>
                    <p>TeacherName: {cert.teacherName}</p>
                    <p>RecipientID: {cert.recipientID}</p>
                    <p>RecipientName: {cert.recipientName}</p>
                    <p>Grade: {cert.grade}</p>
                    <p>Issue Date: {cert.issueDate}</p>
                    <p>Signature: {cert.signature}</p>
                    <p>SignerID: {cert.signerID}</p>
                    <p>SignerName: {cert.signerName}</p>
                    <h3>Verifiy Result: {this.state.verifyResult}</h3>
                </div>
            );
        }
    }

    render() {
        return (
            <div id="padding">
                <h4>Input certificate ID to verify whether this certificate is issued through our platform</h4>
                <br></br>
                <input onChange={this.handleInput} placeholder="Enter certID" />
                <Button variant="info" onClick={this.verifyCert}>Verifiy</Button>
                {this.renderCert(this.state.cert)}
            </div>
        );
    }
}