import React from "react";
import { Container, Header, Content, Sidebar, Sidenav, Icon } from "rsuite";

export default () => {
  return (
    <Container>
      <Sidebar style={{ display: "flex", flexDirection: "column" }} collapsible>
        <Sidenav.Header>
          <div>
            <Icon
              icon="logo-analytics"
              size="lg"
              style={{ verticalAlign: 0 }}
            />
            <span style={{ marginLeft: 12 }}> BRAND</span>
          </div>
        </Sidenav.Header>
        <Sidenav defaultOpenKeys={["3"]} appearance="subtle">
          <Sidenav.Body></Sidenav.Body>
        </Sidenav>
      </Sidebar>

      <Container>
        <Header>
          <h2>Page Title</h2>
        </Header>
        <Content>Content</Content>
      </Container>
    </Container>
  );
};
