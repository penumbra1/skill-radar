import React from "react";
import { CSSTransition } from "react-transition-group";
import { Status } from "../App";
import "./animations.css";

const ContentAnimation = ({ children, show = true }) => (
  <Status.Consumer>
    {({ loading }) => (
      <CSSTransition classNames="fade" in={show} timeout={400} appear>
        <CSSTransition classNames="dim" in={loading} timeout={300}>
          {children || <div />}
        </CSSTransition>
      </CSSTransition>
    )}
  </Status.Consumer>
);

export default ContentAnimation;
