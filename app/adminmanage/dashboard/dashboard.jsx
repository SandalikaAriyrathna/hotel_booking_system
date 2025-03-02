"use client";

import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import { StatRightTopIcon } from "widgets";

const Dash = () => {
  return (
    <>
   <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                               
                            </div>
                        </div>
                    </Col>
                    {ProjectsStatsData.map((item, index) => {
                        return (
                            <Col xl={6} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </Col>
                        )
                    })}
                </Row>

                
            </Container>
        </Fragment>
 </>
);
};

export default Dash;
