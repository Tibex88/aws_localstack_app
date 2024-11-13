import React from "react"
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HomeButton = () => (
  <Button  variant="secondary" className="border border-secondary">
    <Link to="/">
      &lt; Home
    </Link>
  </Button>
);

export { HomeButton };
