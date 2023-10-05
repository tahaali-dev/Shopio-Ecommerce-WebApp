import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { BiLogoLinkedin, BiLogoGithub } from "react-icons/bi";
import "./Footer.css";

const Footer = () => {
  return (
    <div className=" footer-cont">
      <div className="w-85 inner-footer">
        <div>
          <h2 className="font-2">Shopio</h2>
        </div>

        <div className="div-3 color-footer ">
          <Link to="/contactpage" className="link-d color-footer">
            Contact
          </Link>

          <Link to="/policypage" className="link-d color-footer">
            Privacy-Policy
          </Link>
        </div>

        <div className="middle-foot">
          <Link
            className="link-footer"
            to="https://www.instagram.com/taha_ali.in/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
            target="_blank"
          >
            <BsInstagram />
          </Link>

          <Link
            className="link-footer"
            to="https://www.linkedin.com/in/taha-ali-67a06a268/"
            target="_blank"
          >
            <BiLogoLinkedin />
          </Link>

          <Link
            className="link-footer"
            to="https://github.com/tahaali-dev"
            target="_blank"
          >
            <BiLogoGithub />
          </Link>
        </div>

        <div>
          <p>CopyWrite (TahaAli) 2023</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
