import { Component } from 'react';
import { Link } from "react-router-dom";
import {abi, contract_address} from './constants.js';
import { ethers } from 'ethers';
import './Insure.css';
import './Home.css';
import { toast } from 'react-toastify';

class Insure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      premiumPaid: false,
      gotResponse: null,
      error: null,
      txnHash: null,
    }
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

  onPayClick = () => {
    this.setState({gotResponse: false});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = contract_address;
    const contractABI = abi;
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    console.log("requesting accounts");
    provider.send("eth_requestAccounts", []).then(() => {
      const signer = provider.getSigner();
      try {
        console.log("calling payPremium");
        contract
          .connect(signer)
          .payPremium({ value: ethers.utils.parseEther("0.11") })
          .then(response => {
            console.log("payPremium response: ", response);
            this.setState({
              premiumPaid: true,
              gotResponse: true,
              error: null,
              txnHash: response.hash
            });
            toast.success('Premium successfully paid!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch(error => {
            console.error("payPremium: ", error);
            if (error['code'] === "ACTION_REJECTED") {
              this.setState({
                premiumPaid: false,
                gotResponse: null,
                error: null,
                txnHash: null
              });
            } else if (error['code'] === -32603) {
              this.setState({
                premiumPaid: false,
                gotResponse: null,
                error: null,
                txnHash: null
              });
              this.showError("Insufficient account balance!");
            } else {
              this.setState({
                premiumPaid: false,
                gotResponse: true,
                error: JSON.stringify(error),
                txnHash: null
              });
              this.showError('There was some error! 😔');
            }
          });
      } catch (error) {
        console.error("payPremium: ", error);
        this.setState({
          premiumPaid: false,
          gotResponse: true,
          error: JSON.stringify(error),
          txnHash: null
        });
      }
    });
  }

  render() {
    return (
      <>
        <div className="home-heading">
        Insure your BlueChip NFT
        </div>

        <div className="home-subheading">
        Pay a premium of <b>0.1 WOWN</b> per month to keep your funds safe
        </div>

        <div>
          <img alt="" className="insure-nft-image" src="https://www.larvalabs.com/public/images/product/cryptopunks/punk-variety-2x.png"/>
        </div>

        { !this.state.premiumPaid &&
          <div className="home-buttons">
            <div className="insure-success-msg">
              <strong>Are you sure you want to pay a premium of 0.1 WOWN?</strong>
            </div>
            <div className="row home-row-2">
              <div className="col-sm-4">
              </div>
              <div className="col-sm-4">
                { (this.state.gotResponse === null || (this.state.gotResponse && this.state.error !== null)) &&
                  <span className="jhatu-btn insure-btn-pay" onClick={this.onPayClick}>Pay 0.1 WOWN</span>
                }
                { this.state.gotResponse === false &&
                 <span className="jhatu-btn insure-btn-pay waiting"><div className="lds-circle"><div></div></div></span> 
                }
              </div>
              <div className="col-sm-4">
              </div>
            </div>
            { this.state.error !== null &&
              <div className="row home-row-2" style={{color: 'red'}}>
                Error while calling the API: {this.state.error}
              </div>
            }
          </div>
        }
        { this.state.premiumPaid && 
          <div className="home-buttons">
            <div className="insure-success-msg">
              You have successfully paid the premium. <br/><br/>
              Hash: <a target="_blank" rel="noreferrer" className="show-link" href={"https://www.wowen.io/explorer/tx/" + this.state.txnHash + "#1"}>{this.state.txnHash}</a>
            </div>
            <div className="row home-row-2">
              <div className="col-sm-4">
              </div>
              <div className="col-sm-4">
                <Link to="/file-claim"><span className="jhatu-btn">File a Claim</span></Link>
              </div>
              <div className="col-sm-4">
              </div>
            </div>
          </div>
        }
        </>
    );
  }
}


export default Insure;
