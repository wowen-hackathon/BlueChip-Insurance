import { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import './App.css';
import {contract_address} from './constants.js';

class BaseApp extends Component {
  componentDidUpdate(prevProp) {
    console.log("BaseApp: componentDidUpdate", this.props.currentAccount, prevProp.currentAccount);
    if(this.props.currentAccount !== prevProp.currentAccount) {
      if (this.props.currentAccount && !prevProp.currentAccount) {
        if (this.wasConnectClick_) {
          this.successToast("Logged in successfully!");
        }
      } else if (!this.props.currentAccount && prevProp.currentAccount) {
        this.successToast("Logged out successfully!");
      } else {
        this.successToast("Account changed successfully!");
      }
    }
  }

  formatString(inputString) {
	  if (inputString.length <= 9) {
	    return inputString; // No need to truncate or add dots
	  } else {
	    var truncatedString = inputString.substring(0, 5);
	    truncatedString += '...';
	    truncatedString += inputString.substring(inputString.length - 4);
	    return truncatedString;
	  }
  }

  getCurrentAccountId() {
  	return this.props.currentAccount && this.formatString(this.props.currentAccount);
  }

  successToast = (text) => {
    toast.success(text, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  copyToClipboard = (what, value) => {
    var input = window.document.createElement('input');
    input.setAttribute('value', value);
    window.document.body.appendChild(input);
    input.select();
    window.document.execCommand('copy');
    window.document.body.removeChild(input);

    this.successToast(what + ' copied!');
  }

  onFooterClick = () => {
    this.copyToClipboard("Contract address", contract_address);
  }

  handleOnConnectWalletClick = (event) => {
    this.wasConnectClick_ = true;
    if (this.getCurrentAccountId()) {
      this.copyToClipboard("Account address", this.props.currentAccount);
    } else {
      this.props.onConnectWalletClick(event);
    }
  }

  render() {
    return (
      <>
      <div className="App">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/"><span className="heading">BlueChip Insurance</span></Link>
                <Link to="/about"><span className="jhatu-btn float-right btn-about">About</span></Link>
                {this.props.onConnectWalletWait ? 
                	<span className="jhatu-btn float-right btn-connect waiting">
                		<div className="lds-circle"><div></div></div>
                	</span> :
                	<span className="jhatu-btn float-right btn-connect" onClick={this.handleOnConnectWalletClick}>
                		{this.getCurrentAccountId() || "Connect Wallet"}
                	</span>	
                }
              </div>
          </div>
        </nav>
        <div className="app-body">
        	{this.props.children}
        </div>
      </div>
      <div className="footer" onClick={() => this.onFooterClick()}>
        Smart contract deployed on Ethereum at {contract_address}.
      </div>
      </>
    );
  }
}


export default BaseApp;
