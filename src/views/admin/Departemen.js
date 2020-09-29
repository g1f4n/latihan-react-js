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
  Spinner,
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Label,
} from "reactstrap";

// library untuk koneksi ke db
import Parse from "parse";
// Modal handler
import ModalHandler from "components/Modal/Modal";
// alert untuk message
import Alertz from "components/Alert/Alertz";
import Header from "components/Headers/Header";

class Departemen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departemen: [],
      loading: false,
      inputDept: "",
      editMode: false,
      loadingModal: false,
      addMode: false,
      deleteMode: false,
      message: "",
      visible: false,
      fullnames: "",
      userId: "",
      userIndex: 0,
    };
  }

  //   method yang pertama kali di jalankan
  componentDidMount() {
    this.getData();
  }

  // get data from db
  getData = () => {
    this.setState({ loading: true });
    const Departemen = new Parse.Object.extend("Departemen");
    const query = new Parse.Query(Departemen);

    query.equalTo("status", 1);
    query
      .find()
      .then((x) => {
        this.setState({ departemen: x, loading: false });
      })
      .catch((err) => {
        alert(err.message);
        this.setState({ loading: false });
      });
  };

  //   get detail data
  getDetail = (e, id) => {
    e.preventDefault();

    const Departemen = Parse.Object.extend("Departemen");
    const query = new Parse.Query(Departemen);

    query
      .get(id)
      .then(({ attributes }) => {
        this.setState({ inputDept: attributes.deptName, editMode: true });
      })
      .catch((err) => {
        alert(err.message);
        this.setState({ loadingModal: false });
      });
  };

  // Add Data
  handleAdd = (e) => {
    e.preventDefault();
    const { inputDept } = this.state;
    this.setState({ loadingModal: true });

    const Departemen = Parse.Object.extend("Departemen");
    const query = new Departemen();
    query.set("deptName", inputDept);

    query
      .save()
      .then((z) => {
        this.setState({
          addMode: false,
          loadingModal: false,
          departemen: this.state.departemen.concat(z),
          message: "Berhasil tambah data",
          visible: true,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          loadingModal: false,
          message: "Gagal tambah data, coba lagi",
          visible: true,
        });
      });
  };

  //   update data
  handleUpdate = (e) => {
    e.preventDefault();
    const { inputDept } = this.state;
    this.setState({ loadingModal: true });

    const Departemen = Parse.Object.extend("Departemen");
    const query = new Parse.Query(Departemen);

    query
      .get(this.state.userId)
      .then((z) => {
        z.set("deptName", inputDept);
        z.save()
          .then((x) => {
            this.setState({
              editMode: false,
              loadingModal: false,
              message: "Berhasil update data",
              visible: true,
            });
          })
          .catch((err) => {
            console.log(err.message);
            this.setState({
              loadingModal: false,
              message: "Gagal update data, coba lagi",
              visible: true,
            });
          });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          loadingModal: false,
          message: "Gagal update data, coba lagi",
          visible: true,
        });
      });
  };

  //   remove data
  handleRemove = (e) => {
    e.preventDefault();
    this.setState({ loadingModal: true });

    const Departemen = Parse.Object.extend("Departemen");
    const query = new Parse.Query(Departemen);

    query
      .get(this.state.userId)
      .then((z) => {
        z.set("status", 0);
        z.save()
          .then((x) => {
            let newArr = [...this.state.departemen];
            newArr.splice(this.state.userIndex, 1);
            this.setState({
              deleteMode: false,
              loadingModal: false,
              departemen: newArr,
              message: "Berhasil hapus data",
              visible: true,
            });
          })
          .catch((err) => {
            console.log(err.message);
            this.setState({
              loadingModal: false,
              message: "Gagal hapus data, coba lagi",
              visible: true,
            });
          });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          loadingModal: false,
          message: "Gagal hapus data, coba lagi",
          visible: true,
        });
      });
  };

  toggle = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  render() {
    const {
      departemen,
      loading,
      loadingModal,
      addMode,
      editMode,
      deleteMode,
      fullnames,
    } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Alertz
                    color={this.state.color}
                    message={this.state.message}
                    open={this.state.visible}
                    togglez={() => this.toggle("visible")}
                  />
                  <Row>
                    <Button
                      className="ml-2"
                      color="primary"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => this.setState({ addMode: true })}
                    >
                      <i className="fa fa-plus" /> Tambah
                    </Button>
                  </Row>

                  {/* <input type="text" placeholder="input" /> */}
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Departemen</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        <Spinner
                          as="span"
                          cuti
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </td>
                    ) : departemen.length < 1 ? (
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        No data found...
                      </td>
                    ) : (
                      departemen.map((prop, key) => (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{prop.get("deptName")}</td>
                          <td>
                            <Button
                              id="t1"
                              color="primary"
                              //   className="btn-circle"
                              className="btn-circle"
                              onClick={(e) => {
                                this.setState({
                                  userId: prop.id,
                                  userIndex: key,
                                });
                                this.getDetail(e, prop.id);
                              }}
                            >
                              <i className="fa fa-edit" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target="t1"
                            >
                              Ubah data
                            </UncontrolledTooltip>

                            <Button
                              id="t2"
                              className="btn-circle btn-danger btn-small"
                              onClick={(e) => {
                                this.setState({
                                  deleteMode: true,
                                  userId: prop.id,
                                  userIndex: key,
                                  fullnames: prop.get("deptName"),
                                });
                              }}
                            >
                              <i className="fa fa-trash" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target="t2"
                            >
                              Hapus data
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
        {/* add modal */}
        <ModalHandler
          show={addMode}
          loading={loadingModal}
          footer={false}
          handleHide={() => this.toggle("addMode")}
          title="Tambah Data"
          body={
            <div>
              <Form onSubmit={(e) => this.handleAdd(e)}>
                <FormGroup>
                  <Label>Departemen</Label>
                  <Input
                    id="zz1"
                    placeholder="Masukkan departemen"
                    type="text"
                    required={true}
                    onChange={(e) =>
                      this.setState({ inputDept: e.target.value })
                    }
                  />
                </FormGroup>

                <Button
                  color="secondary"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggle("addMode")}
                >
                  Close
                </Button>
                <Button color="primary" type="submit">
                  {loadingModal ? (
                    <div>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
            </div>
          }
          handleSubmit={(e) => this.handleAdd(e)}
        />

        {/* edit modal */}
        <ModalHandler
          show={editMode}
          loading={loadingModal}
          footer={false}
          handleHide={() => this.toggle("editMode")}
          title="Edit Data"
          body={
            <Form onSubmit={(e) => this.handleUpdate(e)}>
              <FormGroup>
                <Label>Departemen</Label>
                <Input
                  id="zz1"
                  placeholder="Masukkan departemen"
                  value={this.state.inputDept}
                  type="text"
                  required={true}
                  onChange={(e) => this.setState({ inputDept: e.target.value })}
                />
              </FormGroup>

              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggle("editMode")}
              >
                Close
              </Button>
              <Button color="primary" type="submit">
                {loadingModal ? (
                  <div>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Submitting...
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          }
          handleSubmit={(e) => this.handleUpdate(e)}
        />

        <ModalHandler
          show={deleteMode}
          loading={loadingModal}
          footer={true}
          handleHide={() => this.toggle("deleteMode")}
          title="Remove Confirmation"
          body={
            <div>
              <h3 className="mb-4">{`Remove departemen ${fullnames} ?`}</h3>
            </div>
          }
          handleSubmit={(e) => this.handleRemove(e)}
        />
      </React.Fragment>
    );
  }
}

export default Departemen;
