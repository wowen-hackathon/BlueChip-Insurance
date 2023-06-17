import { Component } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import { contract_owner } from './constants.js';

class Home extends Component {
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
          <img alt="" className="home-nft-image" src="https://nftplazas.com/wp-content/uploads/2023/01/10-Blue-Chip-NFT-Projects-to-Hold-in-2023-2-1280x720.png"/>
        </div>

        {this.props.accountId !== contract_owner &&
        <div className="home-buttons">
          <div className="row home-row-1">
            <div className="col-sm-4">
              <Link to="/insure"><span className="jhatu-btn">Insure your BlueChip NFT</span></Link>
            </div>
            <div className="col-sm-4">
              <Link to="/file-claim"><span className="jhatu-btn">File a claim</span></Link>
            </div>
            <div className="col-sm-4">
              <Link to="/history"><span className="jhatu-btn">Premium History</span></Link>
            </div>
          </div>
          <div className="row home-row-2">
            <div className="col-sm-4">
            </div>
            <div className="col-sm-4">
              <Link to="/claim-status"><span className="jhatu-btn">Claim Status</span></Link>
            </div>
            <div className="col-sm-4">
            </div>
          </div>
        </div>
        }

        {this.props.accountId === contract_owner &&
        <div className="home-buttons">
          <div className="row home-row-1">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <Link to="/review"><span className="jhatu-btn">Review claims</span></Link>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
        }
      </>
    );
  }
}


export default Home;
