import { Component } from 'react';
import './History.css';
import { ethers } from 'ethers';
import {json_rpc_provider, abi, contract_address} from './constants.js';

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPremium: 0,
      premiumHistory: [],
      gotResponse: false,
      accountId: null,
      error: null
    }

    this.called = false;
    this.dummyList = [
          {"num": 1, "date": 1685363333000, "txn_hash": "0x12321231239123912931"}, 
          {"num": 2, "date": 1685463633000, "txn_hash": "0x98765874589657897689"},
          {"num": 1, "date": 1685363333000, "txn_hash": "0x12321231239123912931"}, 
          {"num": 2, "date": 1685463633000, "txn_hash": "0x98765874589657897689"},
          {"num": 1, "date": 1685363333000, "txn_hash": "0x12321231239123912931"}, 
          {"num": 2, "date": 1685463633000, "txn_hash": "0x98765874589657897689"},
          {"num": 1, "date": 1685363333000, "txn_hash": "0x12321231239123912931"}, 
          {"num": 2, "date": 1685463633000, "txn_hash": "0x98765874589657897689"},
          {"num": 1, "date": 1685363333000, "txn_hash": "0x12321231239123912931"}, 
          {"num": 2, "date": 1685463633000, "txn_hash": "0x98765874589657897689"}
          ];
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    console.log("History: Calling componentDidUpdate");
    if (this.props.accountId === null || this.props.accountId !== this.state.accountId) {
      console.log("History: First check passed");

      if (this.state.premiumHistory.length > 0 || this.state.accountId !== null) {
        console.log("History: Resetting state");
        this.setState({
          totalPremium: 0,
          premiumHistory: [],
          gotResponse: false,
          accountId: null,
          error: null
        });
      }

      if (this.props.accountId === null) return;

      if (this.called) {
        this.called = false;
        return;
      } else {
        this.called = true;
      }

      console.log("History: Getting transactions", this.props.accountId, this.state.accountId);

      this.setState({accountId: this.props.accountId}, () => this.callApi(this.props.accountId));

    }
  }

  callApi(accountId) {
      console.log("calling callApi", accountId);
      const provider = new ethers.providers.JsonRpcProvider(json_rpc_provider);
      const contractAddress = contract_address;
      const contractABI = abi; // Insert your contract's ABI here
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        contract.addressToPremium(accountId)
          .then(response => {
            console.log("addressToPremium response: ", response);
            this.setState({
              totalPremium: response,
              premiumHistory: [], 
              accountId: this.props.accountId, 
              gotResponse: true,
              error: null
            });
          })
          .catch(error => {
            console.error("addressToPremium: ", error);
            this.setState({
              totalPremium: 0,
              premiumHistory: [], 
              accountId: this.props.accountId, 
              gotResponse: true,
              error: JSON.stringify(error)
            });
          });
      } catch (error) {
        console.error("addressToPremium: ", error);
        this.setState({
          totalPremium: 0,
          premiumHistory: [], 
          accountId: this.props.accountId, 
          gotResponse: true,
          error: JSON.stringify(error)
        });
      }


      // if (false) {
      //   fetch('https://api.example.com/data')
      //     .then(response => response = response.json())
      //     .then(jsonPromise => jsonPromise.then(json => {
      //       let premiumHistory = json['premiumHistory'];
      //       this.setState({
      //         premiumHistory: premiumHistory, 
      //         accountId: this.props.accountId, 
      //         gotResponse: true
      //       });
      //     }))
      //     .catch(error => {
      //       console.error(error);
      //       //this.setState({premiumHistory: [], gotResponse: true, error: "" + error});
      //       //alert(error);
      //       setTimeout(() => this.setState({premiumHistory: this.dummyList, gotResponse: true}), 3000);
      //       //alert("This is a dummy list");
      //     });
      // }
  }

  getData() {
    return this.state.premiumHistory.map((ele, idx) => (
        <div className="row" key={idx}>
          <div className="cell col-sm-1">
            {ele['num']}
          </div>
          <div className="cell col-sm-3">
            {new Date(ele['date']).toLocaleString()}
          </div>
          <div className="cell col-sm-3">
            0.1
          </div>
          <div className="cell col-sm-5">
            {ele['txn_hash']}
          </div>
        </div>
      ));
  }

  render() {
    return (
      <>
        <div className="home-heading">
        Your Premium History
        </div>
        <div className="history-content">
        { this.state.accountId !== null && !this.state.gotResponse && 
          (<div className="lds-circle"><div></div></div>)
        }
        {
          this.state.gotResponse && (
          <div className="row">
              Total premium paid is <strong>{this.state.totalPremium/1e18}</strong> WOWN.
          </div>
          )
        }
        { this.state.gotResponse && this.state.premiumHistory.length > 0 &&
          (<>
          <div className="row history-header">
            <div className="cell col-sm-1">
              S. No.
            </div>
            <div className="cell col-sm-3">
              Date
            </div>
            <div className="cell col-sm-3">
              Amount paid (WOWN)
            </div>
            <div className="cell col-sm-5">
              Transaction hash of premium payment
            </div>
          </div>
          <div className="history-body">
            {this.getData()}
          </div>
          </>)
        }
        <div>
          <img alt="" className="insure-nft-image" src="https://s3.amazonaws.com/assets.coingecko.com/app/public/ckeditor_assets/pictures/5923/content_CryptoPunks.png"/>
        </div>

        { this.state.gotResponse && this.state.premiumHistory.length === 0 &&
          <div className="no-history">
            {this.state.error || "Soon you will see each premium entry!"}
          </div>
        }
        { this.state.accountId === null &&
          <div className="no-history">
            You are logged out! Login to check your premium history.
          </div>
        }
        </div>
      </>
    );
  }
}


export default History;
