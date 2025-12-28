import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import "./finance_calculator.css"; // import external CSS

const { Title, Paragraph } = Typography;

const FinanceCalculator = ({carPrice}) => {
  const [results, setResults] = useState(null);

const onFinish = (values) => {
  const price = parseFloat(values.price || 0); // Vehicle price
  const down = parseFloat(values.downPayment || 0);
  const trade = parseFloat(values.tradeIn || 0);
  const interestRate = parseFloat(values.interestRate || 0) / 100;
  const months = parseInt(values.loanTerm || 0);

  const gstRate = 0.047111;
  const financeFee = 1500;
  const totalVehiclePrice = price * (1 + gstRate);
  const totalFinanceFee = financeFee * (1 + gstRate);

  const loanAmount = totalVehiclePrice + totalFinanceFee - down - trade;

  if (loanAmount <= 0 || months <= 0) return;

  // Simple interest formula
  const totalInterest = loanAmount * interestRate * (months / 12);
  const totalRepayment = loanAmount + totalInterest;
  const monthlyPayment = totalRepayment / months;
  const biweeklyPayment = (totalRepayment / (months * 2)); // biweekly average

  setResults({
    monthly: monthlyPayment.toFixed(2),
    biweekly: biweeklyPayment.toFixed(2),
  });
};






  return (
    <div className="finance-calculator">
      <Title level={4}>Finance Calculator</Title>
          <Form layout="vertical" onFinish={onFinish}
              initialValues={{
                  price: carPrice || 0,
                  interestRate: 9.99,
                  loanTerm:60
                  // <-- Pass initial value here
  }}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Vehicle Price"
              name="price"
              rules={[{ required: true, message: "Please enter vehicle price" }]}
            >
              <Input type="number" min={0} step="any"  />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Down Payment"
              name="downPayment"
              rules={[{ required: true, message: "Please enter down payment" }]}
            >
              <Input type="number" min={0} step="any" placeholder="e.g. 5000" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Trade-In Value"
              name="tradeIn"
              rules={[{ required: true, message: "Please enter trade-in value" }]}
            >
              <Input type="number" min={0} step="any" placeholder="e.g. 3000" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Interest Rate (%)"
              name="interestRate"
              rules={[{ required: true, message: "Please enter interest rate" }]}
            >
              <Input type="number" min={0} step="any" placeholder="e.g. 5.99" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Loan Term (months)"
              name="loanTerm"
              rules={[{ required: true, message: "Please enter loan term in months" }]}
            >
              <Input type="number" min={1} placeholder="e.g. 60" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Calculate Payments
          </Button>
        </Form.Item>
      </Form>

      {results && (
        <div className="finance-results">
          <Paragraph>
            <strong>Monthly Payment:</strong> ${results.monthly}
          </Paragraph>
          <Paragraph>
            <strong>Bi-weekly Payment:</strong> ${results.biweekly}
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default FinanceCalculator;
