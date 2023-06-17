import { Component } from "react";
import "./FileClaim.css";
import { ethers } from 'ethers';
import {abi, contract_address} from './constants.js';
import { toast } from 'react-toastify';

class FileClaim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      claimFiled: false,
      gotResponse: null,
      error: null,
      data: {
        txnHash: "",
        txnAmount: "",
        newAccountAddress: "",
        comment: ""
      },
      finalTxnHash: null
    };
  }

  showError = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  onFileClaimClick = () => {
    this.setState({ gotResponse: false });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = contract_address;
    const contractABI = abi;
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    console.log("requesting accounts");
    provider.send("eth_requestAccounts", []).then(() => {
      const signer = provider.getSigner();
      try {
        console.log("calling fileClaim");
        contract
          .connect(signer)
          .fileClaim(
            this.state.data.newAccountAddress, 
            this.state.data.txnHash, 
            ethers.BigNumber.from(ethers.utils.parseEther(this.state.data.txnAmount)),
            this.state.data.comment)
          .then((response) => {
            console.log("fileClaim response: ", response);
            this.setState({
              claimFiled: true,
              gotResponse: true,
              error: null,
              data: {
                txnHash: "",
                txnAmount: "",
                newAccountAddress: "",
                comment: ""
              },
              finalTxnHash: response['hash']
            });
            toast.success("Claim filed successfully!", {
              position: "top-center",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            console.error("claimFile: ", error);
            if (error['code'] === "ACTION_REJECTED") {
              this.setState({
                claimFiled: false,
                gotResponse: null,
                error: null,
              });
              return;
            } else if (error['code'] === 'UNSUPPORTED_OPERATION' && error['reason'] === 'network does not support ENS') {
              this.showError("Account address is invalid, please retry?");
            } else if (error['code'] === 'INVALID_ARGUMENT') {
              const defaultErrorMessage = "There was some error with your " + error['argument'] + "! 😔 Please fix it and retry?";
              const errorMessage = {
                "address": "Account address is invalid, please retry?",
                "_amount": "Transaction amount is invalid, please retry?"
              }
              this.showError(errorMessage[error['argument']] || defaultErrorMessage);
            } else {
              this.showError("There was some error! 😔 Have you paid your first premium?");
            }

            this.setState({
              claimFiled: false,
              gotResponse: true,
              error: JSON.stringify(error),
              finalTxnHash: null,
            });
              
          });
      } catch (error) {
        console.error("claimFile: ", error);
        this.setState({
          claimFiled: false,
          gotResponse: true,
          error: JSON.stringify(error),
          finalTxnHash: null,
        });
      }
    });
  };

  handleChange = (name, event) => {
    if (name === "txnAmount" && event.target.value !== '') {
      try {
        if (ethers.utils.parseEther(event.target.value) < 0) return;
      } catch(error) {
        return;
      }
    }
    this.setState({
      data: {
        ...this.state.data, 
        [name]: name === "comment" ? event.target.value.trimLeft() : event.target.value.trim()
      }
    });
  }

  render() {
    return (
      <>
        <div className="home-heading">File Claim</div>
        {this.state.finalTxnHash === null &&
        <>
        <div className="claim-form">
          <div className="row">
            <div className="col-sm-5">Fraud transaction hash:</div>
            <div className="col-sm-7">
              <input type="text" className="form-control" onChange={event => this.handleChange("txnHash", event)} value={this.state.data.txnHash}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5">Amount of loss (WOWN):</div>
            <div className="col-sm-7">
              <input type="text" className="form-control"  onChange={event => this.handleChange("txnAmount", event)} value={this.state.data.txnAmount}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5">
              Account Address (If approved, where should we send the money?):
            </div>
            <div className="col-sm-7">
              <input type="text" className="form-control"  onChange={event => this.handleChange("newAccountAddress", event)} value={this.state.data.newAccountAddress}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              Anything else you will wish to communicate?
            </div>
          </div>
          <textarea className="form-control" rows="4" onChange={event => this.handleChange("comment", event)} value={this.state.data.comment}/>
        </div>
        <div className="claim-form-btn-wrapper">
          { this.state.gotResponse !== false &&
           <span className="jhatu-btn file-claim-btn-pay" onClick={this.onFileClaimClick}>File a claim</span> 
          }
          { this.state.gotResponse === false &&
           <span className="jhatu-btn file-claim-btn-pay"><div className="lds-circle"><div></div></div></span> 
          }
        </div>
        </>
        }
        { this.state.finalTxnHash &&
        <div className="claim-success">
        Claim Filed successfully! <br/> <br/>
        Hash: <a target="_blank" rel="noreferrer" className="show-link" href={"https://www.wowen.io/explorer/tx/" + this.state.finalTxnHash + "#1"}>{this.state.finalTxnHash}</a>
        </div>
        }
      </>
    );
  }
}

export default FileClaim;
