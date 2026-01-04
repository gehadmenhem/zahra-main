// import { Form, Link } from "react-router-dom";
// https://www.bing.com/videos/riverview/relatedvideo?&q=ant+desin+form&&mid=96F489C67859E74A365396F489C67859E74A3653&&FORM=VRDGAR

// https://ant.design/components/form
import 'primeicons/primeicons.css';
import { useState } from 'react';
// const { MinusCircleOutlined, PlusOutlined } = icons;
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import './newform.css';
function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [disableAllergy, setDisableAllergy] = useState(false);

  function handleDisabbleAllergy() {
    setDisableAllergy((prevDisableAllergy) => {
      const newState = !prevDisableAllergy;
      return newState;
    });
    console.log(disableAllergy);
  }
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Move to the next step
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1); // Move to the previous step
    }
  };
  return (
    <div className="multi-step-form">
      <ul id="progressbar">
        <li className={currentStep >= 0 ? 'active' : ''}>Parent Profile</li>
        <li className={currentStep >= 1 ? 'active' : ''}>Account Details</li>
        <li className={currentStep >= 2 ? 'active' : ''}>Child Profile</li>
        <li className={currentStep >= 3 ? 'active' : ''}>Additional Info</li>
      </ul>

      {/* Step 1 */}
      {currentStep === 0 && (
        <fieldset>
          <h2 className="fs-title">Parent Profile</h2>
          <h3 className="fs-subtitle">Parent details</h3>
          <Form layout="vertical">
            <Form.Item
              name="parentName"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input placeholder="Parent Name" />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              name="postalCode"
              rules={[
                { required: true, message: 'Please enter your postal code' },
              ]}
            >
              <Input placeholder="Postal Code" />
            </Form.Item>

            <Form.Item
              name="relation"
              rules={[
                {
                  required: true,
                  message: 'Please enter your relation to chil',
                },
              ]}
            >
              <Input placeholder="Relation to child" />
            </Form.Item>

            <Button onClick={handleNext}>Next</Button>
          </Form>
        </fieldset>
      )}

      {/* Step 2 */}
      {currentStep === 1 && (
        <fieldset>
          <h2 className="fs-title">Parent Profile</h2>
          <h3 className="fs-subtitle">Parent Account</h3>
          <Form layout="vertical">
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password
                placeholder="Password"
                style={{
                  width: '100%',
                  height: '50px',
                  border: '2px solid #ccc',
                }}
              />
            </Form.Item>
            <Form.Item
              name="cpass"
              rules={[
                { required: true, message: 'Please confirm your password' },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                style={{
                  width: '100%',
                  height: '50px',
                  border: '2px solid #ccc',
                }}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Please enter your phone number' },
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
            <Form.Item
              name="prefPhone"
              rules={[
                {
                  required: true,
                  message: 'Please enter your Emergency phone number',
                },
              ]}
            >
              <Input placeholder="Emergency Phone Number" />
            </Form.Item>
            <Button onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </Form>
        </fieldset>
      )}

      {/* Step 3 */}
      {currentStep === 2 && (
        <fieldset>
          <h2 className="fs-title">Child Profile</h2>
          <h3 className="fs-subtitle">child details</h3>
          <Form layout="vertical">
            <Form.Item name="firstName">
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName">
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="gender"
              rules={[{ required: true, message: 'Please select your gender' }]}
            >
              <Select
                placeholder="Gender"
                style={{
                  width: '100%',
                  height: '50px',
                  border: '2px solid #ccc',
                }}
              >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="dob"
              rules={[
                { required: true, message: 'Please enter your date of birth' },
              ]}
            >
              <DatePicker
                style={{
                  width: '100%',
                  height: '50px',
                  border: '2px solid #ccc',
                }}
                picker="date"
                placeholder="Date of Birth"
              />
            </Form.Item>

            <Form.Item name="gplus">
              <Input placeholder="Google Plus" />
            </Form.Item>
            <Button onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </Form>
        </fieldset>
      )}
      {/* Step 4 */}
      {currentStep === 3 && (
        <fieldset>
          <h2 className="fs-title">Additional Info</h2>
          <h3 className="fs-subtitle">Child details</h3>
          <Form layout="vertical">
            <Form.List name="allergies">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'inline-block',
                        width: '100%',
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'allergy']}
                        rules={[
                          { required: true, message: 'Missing Allergy ' },
                        ]}
                      >
                        <Input.TextArea placeholder="Allergy" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'allergyInfo']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing Allergy information',
                          },
                        ]}
                      >
                        <Input.TextArea placeholder="Allergy Information" />
                      </Form.Item>
                      <p style={{ fontSize: '25px' }}>
                        Remove
                        <i
                          className="pi pi-trash"
                          style={{ fontSize: '1.5rem' }}
                          onClick={() => {
                            remove(name);
                            handleDisabbleAllergy();
                          }}
                        ></i>
                      </p>
                      {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                    </Space>
                  ))}
                  <Form.Item>
                    {!disableAllergy && (
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          handleDisabbleAllergy();
                        }}
                        block
                        className="pi pi-plus"
                      >
                        Add Allergy if exist
                      </Button>
                    )}
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item name="additionalInfo">
              <Input.TextArea placeholder="Additional Info" />
            </Form.Item>
            <Button onClick={handlePrevious}>Previous</Button>
            <Button
              type="primary"
              onClick={() => console.log('Form submitted')} // Add submission logic
            >
              Submit
            </Button>
          </Form>
        </fieldset>
      )}
    </div>
  );
}

export default RegistrationForm;
