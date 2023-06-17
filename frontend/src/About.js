import { Component } from 'react';
import './About.css';
import './Home.css';

class About extends Component {
  render() {
    return (
      <>
        <div className="about-page">
          <div className="home-heading">
            Welcome to BlueChip Insurance! Your one stop shop for insuring high value NFTs.
          </div>
          
          <div className="row about-newpara center">
            Welcome to BlueChip Insurance, the leading provider of insurance solutions for Bluechip NFTs. We understand the importance of protecting your valuable digital assets, and that's why we offer comprehensive coverage for a wide range of famous NFT collections. Our goal is to ensure that you can enjoy peace of mind while owning and trading your cherished digital artworks.
          </div>

          <div className="about-newpara center">
            <img alt="" className="about-nft-image" src="https://media.smallbiztrends.com/2022/02/popular-and-best-selling-nft-collection-this-week.jpg"/>
          </div>

          <div className="row about-newpara">
            At BlueChip Insurance, we support all major and famous NFT collections, including but not limited to:
            <ol>
              <li><strong>CryptoPunks:</strong> As one of the pioneering NFT collections, CryptoPunks has gained significant popularity and value in the digital art world. We provide insurance coverage for these unique and iconic pixelated characters.</li>
              <li><strong>Bored Ape Yacht Club:</strong> The Bored Ape Yacht Club has quickly become one of the most sought-after NFT collections, known for its unique and customizable ape-themed artwork. We offer insurance coverage for these collectible and highly valued pieces.</li>
              <li><strong>Art Blocks:</strong> Art Blocks is a platform that hosts generative art projects created by talented artists. Each project produces a limited number of unique pieces. We provide insurance coverage for Art Blocks projects, ensuring the protection of these artistic creations.</li>
              <li><strong>Pudgy Penguins:</strong> Pudgy Penguins is a collection of adorable, cartoonish penguin NFTs. With our insurance, you can safeguard your Pudgy Penguins against loss, theft, or damage.</li>
              <li><strong>Mutant Ape Yacht Club:</strong> The Mutant Ape Yacht Club is a unique NFT collection featuring mutant apes with distinct characteristics. Our insurance coverage ensures the safety of these extraordinary digital assets.</li>
              <li><strong>World of Women:</strong> World of Women is a collection that celebrates the achievements and diversity of women. With our insurance, you can preserve the value and rarity of these empowering NFTs.</li>
              <li><strong>The Sandbox:</strong> The Sandbox is a virtual world where players can build, own, and monetize their gaming experiences using NFTs. We offer insurance coverage for the valuable assets created within this immersive metaverse.</li>
              <li><strong>NBA Top Shot:</strong> NBA Top Shot revolutionized the way we collect and trade sports highlights as NFTs. Our insurance policy protects your NBA Top Shot moments, preserving their value and authenticity.</li>
            </ol>
          </div>

          <div className="row about-newpara">
            These are just a few examples of the famous NFT collections we support at BlueChip Insurance. We strive to stay up to date with the latest trends and emerging collections in the NFT space, ensuring that our clients have comprehensive coverage for their prized digital assets.
          </div>

          <div className="row about-newpara">
            With BlueChip Insurance, you can rest assured knowing that your Bluechip NFTs are protected against risks such as theft, loss, damage, and even market fluctuations. We are here to provide you with the peace of mind you deserve, allowing you to fully enjoy and benefit from your valuable NFT investments.
          </div>

          <div className="about-newpara center">
            <img alt="" className="about-nft-image" src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/05/07/16519343645224.jpg"/>
          </div>
        </div>
        </>
    );
  }
}


export default About;
