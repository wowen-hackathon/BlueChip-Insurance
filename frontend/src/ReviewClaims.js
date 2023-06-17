import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import {json_rpc_provider, abi, contract_address, contract_owner} from './constants.js';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import './ReviewClaims.css';

class ReviewClaims extends Component {
  constructor(props) {
    super(props);

    this.state = {
      claimHistory: [],
      gotResponse: false,
      accountId: null,
      error: null,
      gotResponseForApproveRejectAction: null,
      claimNumberForApproveRejectAction: null,
      actionForApproveRejectAction: null
    }

    this.called = false;
    this.dummyList = [
          {"claimNumber": 1, "date": 1685363333000, "amount": "23.12", "txn_hash": "0x12321231239123912931", "newAddress": "0xC37d2eE37e7f041985546fE8B42bb03D6616A582", "status": "Pending"}, 
          {"claimNumber": 2, "date": 1685463633000, "amount": "203.12", "txn_hash": "0x98765874589657897689", "newAddress": "0xC37d2eE37e7f041985546fE8B42bb03D6616A582", "status": "Approved"}, 
          {"claimNumber": 3, "date": 1685483633000, "amount": "230.12", "txn_hash": "0x16453212342342342931", "newAddress": "0xC37d2eE37e7f041985546fE8B42bb03D6616A582", "status": "Rejected"}
          ];
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    console.log("Claim Status: Calling componentDidUpdate");
    if (this.props.accountId === null || this.props.accountId !== this.state.accountId) {
      console.log("Claim Status: First check passed");

      if (this.state.claimHistory.length > 0 || this.state.accountId !== null) {
        console.log("Claim Status: Resetting state");
        this.setState({
          claimHistory: [],
          gotResponse: false,
          accountId: null,
          error: null,
          gotResponseForApproveRejectAction: null,
          claimNumberForApproveRejectAction: null,
          actionForApproveRejectAction: null
        });
      }

      if (this.props.accountId === null) return;

      if (this.called) {
        this.called = false;
        return;
      } else {
        this.called = true;
      }

      console.log("Claim History: Getting transactions", this.props.accountId, this.state.accountId);

      this.setState({accountId: this.props.accountId}, () => this.callApi(this.props.accountId));

    }
  }

  shortenIt = (inputString) => {
    if (inputString.length <= 9) {
      return inputString; // No need to truncate or add dots
    } else {
      var truncatedString = inputString.substring(0, 5);
      truncatedString += '...';
      truncatedString += inputString.substring(inputString.length - 4);
      return truncatedString;
    }
  }

  responseToClaimObject = (response) => {
    return {
      claimNumber: response.claimNumber.toString(),
      amount: (response.amount / 1e18).toString(),
      txn_hash: response.transactionHash.toString(),
      date: parseInt(response.timestamp * 1000),
      newAddress: response.newAddress,
      status: ['Pending', 'Approved', 'Rejected'].at(response.status)
    }
  }

  addClaimToTheList = (claim, accountId) => {
    this.setState(prevState => {
      if(prevState.claimHistory.filter(x => x.claimNumber === claim.claimNumber.toString()).length > 0) {
        // Claim already present in list
        return {};
      }

      let tempClaimHistory = [...prevState.claimHistory];
      tempClaimHistory.push(this.responseToClaimObject(claim));

      return {
        claimHistory: tempClaimHistory,
        gotResponse: true,
        accountId: accountId,
      };
    });
  }

  callApi(accountId) {
      console.log("calling callApi", accountId);
      const provider = new ethers.providers.JsonRpcProvider(json_rpc_provider);
      const contractAddress = contract_address;
      const contractABI = abi; // Insert your contract's ABI here
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        contract.claimCounter()
          .then(claimCount => {
            console.log("claimCounter response: ", claimCount);
            if (claimCount === 0) {
              this.setState({
                claimHistory: [],
                accountId: accountId, 
                gotResponse: true,
                error: null
              });              
              return;
            }

            while(claimCount--) {
              console.log("calling getClaimsById", claimCount);
              contract.getClaimsById(claimCount)
                .then(claim => {
                  this.addClaimToTheList(claim, accountId);
                })
                .catch(error => {
                  console.error("getClaimsById: ", error);
                  this.setState({
                    claimHistory: [], 
                    accountId: accountId, 
                    gotResponse: true,
                    error: JSON.stringify(error)
                  });
                })
            }
          })
          .catch(error => {
            console.error("claimCounter: ", error);
            this.setState({
              claimHistory: [], 
              accountId: accountId, 
              gotResponse: true,
              error: JSON.stringify(error)
            });
          });
      } catch (error) {
        console.error("claimCounter: ", error);
        this.setState({
          claimHistory: [], 
          accountId: accountId, 
          gotResponse: true,
          error: JSON.stringify(error)
        });
      }
  }

  changeStatusAndMarkAsResponseReceived = (claimNumber, newStatus) => {
    const newClaimHistory = this.state.claimHistory.map(ele => {
      if (ele['claimNumber'] === claimNumber) {
        ele['status'] = newStatus;
      }
      return ele;
    });
    this.setState({
      claimHistory: newClaimHistory, 
      gotResponseForApproveRejectAction: true,
      claimNumberForApproveRejectAction: null,
      actionForApproveRejectAction: null});
  }

  onApprove = (claimNumber) => {
    this.setState({
      gotResponseForApproveRejectAction: false,
      claimNumberForApproveRejectAction: claimNumber,
      actionForApproveRejectAction: "Approve"
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = contract_address;
    const contractABI = abi;
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    provider.send("eth_requestAccounts", []).then(() => {
      const signer = provider.getSigner();
      try {
        console.log("calling approveClaim");
        contract.connect(signer).approveClaim(claimNumber)
          .then(response => {
            console.log("approveClaim response: ", response);
            this.changeStatusAndMarkAsResponseReceived(claimNumber, "Approved");

            toast.success('Claim Approved!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch(error => {
            console.error("approveClaim: ", error);
            this.setState({
              gotResponseForApproveRejectAction: true,
              claimNumberForApproveRejectAction: null,
              actionForApproveRejectAction: null
            });
            toast.error('There was some error! 😔', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } catch (error) {
        console.error("approveClaim: ", error);
        this.setState({
          gotResponseForApproveRejectAction: true,
          claimNumberForApproveRejectAction: null,
          actionForApproveRejectAction: null
        });
      }
    });
  }

  onReject = (claimNumber) => {
    this.setState({
      gotResponseForApproveRejectAction: false,
      claimNumberForApproveRejectAction: claimNumber,
      actionForApproveRejectAction: "Reject"
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = contract_address;
    const contractABI = abi;
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    provider.send("eth_requestAccounts", []).then(() => {
      const signer = provider.getSigner();
      try {
        console.log("calling rejectClaim");
        contract.connect(signer).rejectClaim(claimNumber)
          .then(response => {
            console.log("rejectClaim response: ", response);
            this.changeStatusAndMarkAsResponseReceived(claimNumber, "Rejected");

            toast.error('Claim Rejected!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch(error => {
            console.error("rejectClaim: ", error);
            this.setState({
              gotResponseForApproveRejectAction: true,
              claimNumberForApproveRejectAction: null,
              actionForApproveRejectAction: null
            });
            toast.error('There was some error! 😔', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } catch (error) {
        console.error("rejectClaim: ", error);
        this.setState({
          gotResponseForApproveRejectAction: true,
          claimNumberForApproveRejectAction: null,
          actionForApproveRejectAction: null
        });
      }
    });
  }

  getTextOrWait = (claimNumber, text) => {
    if (this.state.actionForApproveRejectAction === text && this.state.claimNumberForApproveRejectAction === claimNumber) {
      return <div className="lds-circle"><div></div></div>;
    } else {
      return text;
    }
  }

  onAccountAddressClick = (accountAddress) => {
    var input = window.document.createElement('input');
    input.setAttribute('value', accountAddress);
    window.document.body.appendChild(input);
    input.select();
    window.document.execCommand('copy');
    window.document.body.removeChild(input);

    toast.success('Account ID copied to clipboard', {
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

  getData() {
    return this.state.claimHistory.map((ele, idx) => (
        <div className="row" key={ele['claimNumber']}>
          <div className="cell col-sm-1">
            {(parseInt(ele['claimNumber'])*71 + 100000).toString(16).toUpperCase()}
          </div>
          <div className="cell col-sm-1">
            {new Date(ele['date']).toLocaleString()}
          </div>
          <div className="cell col-sm-2">
            <a target="_blank" rel="noreferrer" className="show-link" href={"https://www.wowen.io/explorer/tx/" + ele['txn_hash'] + "#1"}>{this.shortenIt(ele['txn_hash'])}</a>
          </div>
          <div className="cell col-sm-2">
            {ele['amount']}
          </div>
          <div className="cell col-sm-2" onClick={() => this.onAccountAddressClick(ele['newAddress'])} style={{cursor: 'pointer'}}>
            {this.shortenIt(ele['newAddress'])}
          </div>
          <div className="cell col-sm-2">
            {ele['status']}
          </div>
          <div className="cell col-sm-2">
            {ele['status'] === 'Approved' || this.state.gotResponseForApproveRejectAction === false
            ? (<><span className="jhatu-btn approve disabled">{this.getTextOrWait(ele['claimNumber'], "Approve")}</span>
                 <span className="jhatu-btn reject disabled">{this.getTextOrWait(ele['claimNumber'], "Reject")}</span></>)
            : (<><span className="jhatu-btn approve" onClick={() => this.onApprove(ele['claimNumber'])}>Approve</span>
                 <span className="jhatu-btn reject" onClick={() => this.onReject(ele['claimNumber'])}>Reject</span></>)
            }
          </div>
        </div>
      ));
  }

  render() {
    return contract_owner !== this.props.accountId ? <Navigate to="/" /> : (
      <>
        <div className="home-heading">
        Review Claims
        </div>
        <div className="review-claim-history-content">
        { this.state.accountId !== null && !this.state.gotResponse && 
          (<div className="lds-circle"><div></div></div>)
        }
        { this.state.gotResponse && this.state.claimHistory.length > 0 &&
          (<>
          <div className="row review-claim-history-header">
            <div className="cell col-sm-1">
              Claim reference no.
            </div>
            <div className="cell col-sm-1">
              Date
            </div>
            <div className="cell col-sm-2">
              Transaction hash of fraudulent tx
            </div>
            <div className="cell col-sm-2">
              Amount of loss (WOWN)
            </div>
            <div className="cell col-sm-2">
              Account address for disbursement
            </div>
            <div className="cell col-sm-2">
              Status
            </div>
            <div className="cell col-sm-2">
              Action
            </div>
          </div>
          <div className="review-claim-history-body">
            {this.getData()}
          </div>
          </>)
        }
        { this.state.gotResponse && this.state.claimHistory.length === 0 &&
          <div className="no-review-claim-history">
            {this.state.error || "No Claims. Once you raise a claim, you can check its status here."}
          </div>
        }
        { this.state.accountId === null &&
          <div className="no-review-claim-history">
            You are logged out! Login to check your claim status.
          </div>
        }
        </div>
      </>
    );
  }
}


export default ReviewClaims;
