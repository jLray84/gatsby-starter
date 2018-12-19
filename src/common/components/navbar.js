import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { FiMenu } from 'react-icons/fi';
import '../styles/custom.tachyons.css';


const MultiLink = (props) => {
  const internal = /^\/(?!\/)/.test(props.to);
  let result;
  if (internal) {
    result = (<Link to={props.to} className={props.className}>{props.children}</Link>)
  } else {
    result = (<a href={props.to} className={props.className}>{props.children}</a>)
  }
  return result;
}

const SliderMenu = (props) => (
  <div
    className={
      "flex flex-column justify-center items-center bg-washed-red fixed top z-max w-100 ease" + (props.active ? " vh-100" : " h0")
    }>
    <Link
      to="/"
      className={"display ttu tracked dark-gray f4 no-underline" + (props.active ? " db" : " dn")}
      >{props.siteTitle}
    </Link>
    {props.extraLinks.map(navLink => (
      <MultiLink
        to={navLink.to}
        className={"sans-serif ttu mid-gray f5 no-underline ease" + (props.active ? " db" : " dn")}
        >{navLink.name}
      </MultiLink>
    ))}
  </div>
)


export default class Navbar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      menuToggle: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  };

  toggleMenu(event) {
    this.setState({
      menuToggle: !this.state.menuToggle,
    })
  };

  render () {
    return (
      <StaticQuery
        query={graphql`
        query {
          site {
            siteMetadata {
              navbarLinks {
                to
                name
              }
              siteTitle: title
            }
          }
        }  
      `}
      render={data => (
        <React.Fragment>
          <div
            className="bg-white flex w-100 h3 pv3 flex justify-between items-center top-0 z-999 bb b--light-gray"
            style={{position: "sticky"}}>
            <div className="w-100 mw8 flex justify-between justify-around-l items-center ph4 pa2-ns">
              <button
                className="ttu tracked dark-gray f4 no-underline bn bg-transparent pointer"
                onClick={this.toggleMenu}>
                <FiMenu />
              </button>
              <Link to="/" className="display ttu tracked dark-gray f4 no-underline">{data.site.siteMetadata.siteTitle}</Link>
              <Link to="/" className="sans-serif ttu mid-gray f5 no-underline dn dib-l">HOME</Link>
              {data.site.siteMetadata.navbarLinks.map(navLink => (
                <MultiLink to={navLink.to} className="sans-serif ttu mid-gray f5 no-underline dn dib-l">{navLink.name}</MultiLink>
              ))}
            </div>
            <div className="dn w-100 mw5 flex-l justify-around items-center">
              <Link href="/sign-up" className="sans-serif ttu light-red f5 no-underline dn dib-l">SIGN UP</Link>
              <span className="sans-serif mid-gray dn dib-l">|</span>
              <Link href="/about" className="sans-serif ttu mid-gray f5 no-underline dn dib-l">ABOUT</Link>
            </div>
          </div>
          <SliderMenu
            active={this.state.menuToggle}
            extraLinks={data.site.siteMetadata.navbarLinks}
            siteTitle={data.site.siteMetadata.siteTitle}/>
        </React.Fragment>
      )} />
    )
  }
}
