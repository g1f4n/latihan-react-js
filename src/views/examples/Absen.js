/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getLeaderId } from "utils";

class Absen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      absen: [],
      loading: false,
      startDate: "",
    };
  }

  componentDidMount() {}

  // query absen
  queryAbsen = (
    rolesIdKey,
    containedRoles,
    startDate = "today",
    filterType = "day"
  ) => {
    const Absen = Parse.Object.extend("Absence");
    const query = new Parse.Query(Absen);

    const hierarki = new Parse.User();
    const hierarkiQuery = new Parse.Query(hierarki);

    let start, finish;

    if (startDate !== "today") {
      const d = new Date();
      start = new moment(startDate);
      start.startOf(filterType);
      finish = new moment(start);
      finish.add(1, filterType);
    } else {
      const d = new Date();
      start = new moment(d);
      start.startOf(filterType);
      finish = new moment(start);
      finish.add(1, filterType);
    }
    hierarkiQuery.containedIn("roles", containedRoles);
    hierarkiQuery.equalTo(rolesIDKey, {
      __type: "Pointer",
      className: "_User",
      objectId: getLeaderId(),
    });

    query.ascending("absenMasuk");
    query.greaterThanOrEqualTo("absenMasuk", start.toDate());
    query.lessThan("absenMasuk", finish.toDate());
    query.matchesQuery("user", hierarkiQuery);
    query.include("user");
    query
      .find()
      .then((x) => {
        console.log("user", x);
        this.setState({ absence: x, loading: false });
      })
      .catch((err) => {
        alert(err.message);
        this.setState({ loading: false });
      });
  };
}
