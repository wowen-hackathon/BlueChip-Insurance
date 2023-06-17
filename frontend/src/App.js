import { Component } from 'react';
import './App.css';
import Home from "./Home.js";
import About from "./About.js";
import Insure from "./Insure.js";
import History from "./History.js";
import FileClaim from "./FileClaim.js";
import ClaimStatus from "./ClaimStatus.js";
import ReviewClaims from "./ReviewClaims.js";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import BaseApp from './BaseApp.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: null,
      detectedEthereumProvider: false,
      onConnectWalletWait: false,
      listeningToUpdates: false,
    }
    this.onConnectWalletClick = this.onConnectWalletClick.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.mountCount = 0;
  }

  handleAccountsChanged(accounts) {
    console.log("handleAccountsChanged called");
    if (accounts.length === 0) {
      this.setState({currentAccount: null});
    } else if (accounts[0] !== this.state.currentAccount) {
      this.setState({currentAccount: accounts[0].toLowerCase()});
    } else {
      console.log("handleAccountsChanged did nothing");
    }
  }

  getAccount() {
    window.ethereum.request({ method: 'eth_accounts' })
      .then(this.handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
  }

  errorToast = (text) => {
    toast.error(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  componentDidMount() {
      this.mountCount += 1;
      console.log("Calling detectEthereumProvider");
      detectEthereumProvider().then(
        provider => {
          this.setState({detectedEthereumProvider: true});
          if (provider) {
            //if (provider !== window.ethereum) {
            //console.error('Do you have multiple wallets installed?');
            this.getAccount();
            window.ethereum.on('accountsChanged', this.handleAccountsChanged);
            this.setState({listeningToUpdates: true});
            //}
          } else {
            console.log('mountCount', this.mountCount);
            this.mountCount -= 1;
            if (this.mountCount === 1) {
              this.errorToast('Please install MetaMask!');
            }
          }
      }).catch(error => {
        this.setState({detectedEthereumProvider: true});

        console.log('Unknown error occurred', error);
      });
    }

  componentWillUnmount() {
    console.log("Calling componentWillUnmount");
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
    }
  }

  onConnectWalletClick() {
    this.setState({onConnectWalletWait: true});
    if (this.state.detectedEthereumProvider === false) {
      setTimeout(this.onConnectWalletClick, 200);
      return;
    }

    if (!window.ethereum) {
      this.setState({onConnectWalletWait: false});
      console.log('Please install MetaMask!');
      this.errorToast('Please install MetaMask!');
      return;
    }

    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        if (!this.state.listeningToUpdates) {
          window.ethereum.on('accountsChanged', this.handleAccountsChanged);
        }
        this.setState({onConnectWalletWait: false, currentAccount: accounts[0].toLowerCase(), listeningToUpdates: true});
      })
      .catch((err) => {
        this.setState({onConnectWalletWait: false});
        console.log("Error getting account", err);

        if (err.code !== 4001) {
          this.errorToast("Error getting account!");
        }
      });
  }

  wrap(component) {
    return (
      <BaseApp
        currentAccount = {this.state.currentAccount}
        onConnectWalletClick = {this.onConnectWalletClick}
        onConnectWalletWait = {this.state.onConnectWalletWait}
        >
        {component}
        <ToastContainer />
      </BaseApp>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={this.wrap(<Home accountId={this.state.currentAccount}/>)}
            key='route-home'
          />
          <Route
            exact
            path="/about"
            element={this.wrap(<About/>)}
            key='route-about'
          />
          <Route
            exact
            path="/insure"
            element={this.wrap(<Insure/>)}
            key='route-insure'
          />
          <Route
            exact
            path="/file-claim"
            element={this.wrap(<FileClaim/>)}
            key='route-file-clain'
          />
          <Route
            exact
            path="/history"
            element={this.wrap(<History accountId={this.state.currentAccount}/>)}
            key='route-history'
          />
          <Route
            exact
            path="/claim-status"
            element={this.wrap(<ClaimStatus accountId={this.state.currentAccount}/>)}
            key='route-status'
          />
          <Route
            exact
            path="/review"
            element={this.wrap(<ReviewClaims accountId={this.state.currentAccount}/>)}
            key='route-status'
          />
          <Route path="/*" element={ <Navigate to="/" /> }/>
        </Routes>
      </BrowserRouter>
    );
  }
}


export default App;
