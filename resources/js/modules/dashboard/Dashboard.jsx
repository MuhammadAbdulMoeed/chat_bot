import React from "react";
import styles from "./Dashboard.module.scss";
import { BannerImg } from "../../assets";
import { Topbar } from "../../components/common";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <Container>
        <Row className={styles.wrap_content}>
          <div className={styles.dashboard_container}>
            <Col lg={6} md={12}>
              <div className={styles.dashboard_container_content_left}>
                <img src={BannerImg} alt="Banner" />
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className={styles.dashboard_container_content_right}>
                <div
                  className={styles.dashboard_container_content_right_chatbox}
                >
                  <Topbar />
                  <Outlet />
                </div>
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
