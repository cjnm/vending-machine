import './App.css';
import { Page, Layout, Card, Badge, Button, Stack, Heading, Select } from '@shopify/polaris';
import React from 'react';

function App() {
  return (
    <Page
      title="Soda Vending Machine"
      primaryAction={
        <React.Fragment>
          <Button primary>
            Buy
          </Button>
          <Button primary>
            Return
          </Button>
        </React.Fragment>
      }
    >
      <Layout>
        <Layout.Section secondary>
          <Card title="Coke" sectioned>
            <span className="inventory-badge">
              <Badge status="info">10 Available</Badge>
            </span>
            <Badge status="success">Rs. 20/unit</Badge>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Pepsi" sectioned>
            <span className="inventory-badge">
              <Badge status="info">10 Available</Badge>
            </span>
            <Badge status="success">Rs. 25/unit</Badge>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Dew" sectioned>
            <span className="inventory-badge">
              <Badge status="info">10 Available</Badge>
            </span>
            <Badge status="success">Rs. 30/unit</Badge>
          </Card>
        </Layout.Section>
      </Layout>
      <br />
      <Layout>
        <Layout.Section>
          <Card title="Buy soda">
            <Card.Section>
              <Stack distribution="fillEvenly">
                <Heading>Soda</Heading>
                <Heading>Rate</Heading>
                <Heading>Unit</Heading>
                <Heading>Amount</Heading>
              </Stack>
              <Stack distribution="fillEvenly">
                <p>Coke</p>
                <p>Rs. 25/unit</p>
                <Select
                  options={[{ label: '1', value: '1' },]}
                  // onChange={handleSelectChange}
                  value={1}
                />
                <p>Rs. 25</p>
              </Stack>
              <Stack distribution="fillEvenly">
                <p>Pepsi</p>
                <p>Rs. 25/unit</p>
                <Select
                  options={[{ label: '1', value: '1' },]}
                  // onChange={handleSelectChange}
                  value={1}
                />
                <p>Rs. 25</p>
              </Stack>
              <Stack distribution="fillEvenly">
                <p>Dew</p>
                <p>Rs. 25/unit</p>
                <span className="quantity-dropdown">
                  <Select
                    options={[{ label: '1', value: '1' },]}
                    // onChange={handleSelectChange}
                    value={1}
                  />
                </span>
                <p>Rs. 25</p>
              </Stack>
            </Card.Section>
            <Card.Section>
              <Stack distribution="equalSpacing">
                <Heading>Total: Rs. 25</Heading>
                <input placeholder='please nsert coin here'></input>
                <Button primary>Pay</Button>
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
      <br />
      <Layout>
        <Layout.Section>
          <Card title="Purchase">
            <Card.Section>
              <Stack distribution="fillEvenly">
                <Heading>Soda</Heading>
                <Heading>Rate</Heading>
                <Heading>Unit</Heading>
                <Heading>Amount</Heading>
              </Stack>
              <Stack distribution="fillEvenly">
                <p>Coke</p>
                <p>Rs. 25/unit</p>
                <p>1</p>
                <p>Rs. 25</p>
              </Stack>
              <Stack distribution="fillEvenly">
                <p>Pepsi</p>
                <p>Rs. 25/unit</p>
                <p>1</p>
                <p>Rs. 25</p>
              </Stack>
              <Stack distribution="fillEvenly">
                <p>Dew</p>
                <p>Rs. 25/unit</p>
                <p>1</p>
                <p>Rs. 25</p>
              </Stack>
            </Card.Section>
            <Card.Section>
              <Stack distribution="equalSpacing">
                <Heading>Total: Rs. 20</Heading>
                <Heading>Refund: Rs. 5</Heading>
                {/* <input placeholder='please nsert coin here'></input> */}
                <Button primary>Pay</Button>
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default App;
