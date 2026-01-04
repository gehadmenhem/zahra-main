import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import apiCalls from '../../api/apiCalls';
import ImageUploader from '../UploadImages/ImageUploader';
import './preApprove.css';

const PreApproveForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalForm] = Form.useForm();
  const [employmentForm] = Form.useForm();
  const [financialForm] = Form.useForm();
  const [coApplicantPersonalForm] = Form.useForm();
  const [coApplicantEmploymentForm] = Form.useForm();
  const [coApplicantFinancialForm] = Form.useForm();
  const [documentsForm] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasCoApplicant, setHasCoApplicant] = useState(null);
  const [consentChecked, setConsentChecked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    documentsForm.setFieldsValue({ upload: fileList });
  }, [fileList, documentsForm]);

  const getMaxStep = () => {
    if (hasCoApplicant === null) return 2; // Before deciding co-applicant
    if (hasCoApplicant) return 7; // Personal(0), Employment(1), Financial(2), CoPersonal(3), CoEmployment(4), CoFinancial(5), Documents(6), Success(7)
    return 3; // Personal(0), Employment(1), Financial(2), Documents(3), Success(4)
  };

  const handleNext = () => {
    const maxStep = getMaxStep();
    if (currentStep < maxStep) {
      let formToValidate;
      if (currentStep === 0) formToValidate = personalForm;
      else if (currentStep === 1) formToValidate = employmentForm;
      else if (currentStep === 2) formToValidate = financialForm;
      else if (currentStep === 3 && hasCoApplicant)
        formToValidate = coApplicantPersonalForm;
      else if (currentStep === 4 && hasCoApplicant)
        formToValidate = coApplicantEmploymentForm;
      else if (currentStep === 5 && hasCoApplicant)
        formToValidate = coApplicantFinancialForm;

      if (currentStep === 2 && hasCoApplicant === null) {
        // Special case: after financial, ask about co-applicant
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
        return;
      }

      formToValidate
        .validateFields()
        .then((values) => {
          setFormData((prev) => ({ ...prev, ...values }));
          setCurrentStep(currentStep + 1);
          window.scrollTo(0, 0);
        })
        .catch(() => {
          notification.info({
            message: 'Info',
            description: 'Please fill in all required fields to proceed',
            duration: 5,
          });
        });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Check if at least one document is uploaded
      if (fileList.length === 0) {
        notification.error({
          message: 'Error',
          description: 'Please upload at least one document',
          duration: 5,
        });
        setLoading(false);
        return;
      }

      const documentsValues = await documentsForm.validateFields();

      const submitData = { ...formData, ...documentsValues };

      // Format date if present
      if (submitData.dateOfBirth) {
        submitData.dateOfBirth = dayjs(submitData.dateOfBirth).format(
          'YYYY-MM-DD'
        );
      }
      if (submitData.coApplicantDateOfBirth) {
        submitData.coApplicantDateOfBirth = dayjs(
          submitData.coApplicantDateOfBirth
        ).format('YYYY-MM-DD');
      }

      const result = await apiCalls.sendPreApproved(submitData);

      if (result) {
        notification.success({
          message: 'Success',
          description: 'Pre-approval application submitted successfully!',
          duration: 5,
        });
        // Reset forms
        personalForm.resetFields();
        employmentForm.resetFields();
        financialForm.resetFields();
        coApplicantPersonalForm.resetFields();
        coApplicantEmploymentForm.resetFields();
        coApplicantFinancialForm.resetFields();
        documentsForm.resetFields();
        setFileList([]);
        setFormData({});
        setHasCoApplicant(null);
        setConsentChecked(false);
        setCurrentStep(8); // Go to success step
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Failed to submit application: ${error.message || error}`,
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  return (
    <div className="preapprove-full-bg">
      <div className="preapprove-overlay">
        <div className="multi-step-form">
          <ul id="progressbar">
            <li className={currentStep >= 0 ? 'active' : ''}>Personal Info</li>
            <li className={currentStep >= 1 ? 'active' : ''}>Employment</li>
            <li className={currentStep >= 2 ? 'active' : ''}>Financial Info</li>
            {hasCoApplicant && (
              <li className={currentStep >= 3 ? 'active' : ''}>
                Co-Applicant Personal
              </li>
            )}
            {hasCoApplicant && (
              <li className={currentStep >= 4 ? 'active' : ''}>
                Co-Applicant Employment
              </li>
            )}
            {hasCoApplicant && (
              <li className={currentStep >= 5 ? 'active' : ''}>
                Co-Applicant Financial
              </li>
            )}
            <li
              className={
                currentStep >= (hasCoApplicant ? 6 : 3) ? 'active' : ''
              }
            >
              Documents
            </li>
            <li className={currentStep >= 8 ? 'active' : ''}>Success</li>
          </ul>

          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <fieldset>
              <h2 className="fs-title">Personal Information</h2>
              <h3 className="fs-subtitle">Basic Details</h3>
              <Form layout="vertical" form={personalForm}>
                <div className="form-row">
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your first name',
                      },
                    ]}
                  >
                    <Input placeholder="John" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your last name',
                      },
                    ]}
                  >
                    <Input placeholder="Doe" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input placeholder="john.doe@example.com" />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your phone number',
                      },
                      {
                        pattern: /^[0-9\s-+()]*$/,
                        message: 'Please enter a valid phone number',
                      },
                    ]}
                  >
                    <Input placeholder="(123) 456-7890" />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: 'Please enter your address' },
                  ]}
                >
                  <Input placeholder="123 Main St, City, Province, Postal Code" />
                </Form.Item>
                <div className="form-row">
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[
                      { required: true, message: 'Please enter your city' },
                    ]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                  <Form.Item
                    label="Province"
                    name="province"
                    rules={[
                      { required: true, message: 'Please enter your province' },
                    ]}
                  >
                    <Input placeholder="Province" />
                  </Form.Item>
                  <Form.Item
                    label="Postal Code"
                    name="postalCode"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your postal code',
                      },
                    ]}
                  >
                    <Input placeholder="A1A 1A1" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Residence Status"
                    name="residenceStatus"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your residence status',
                      },
                    ]}
                  >
                    <Select placeholder="Select residence status">
                      <Select.Option value="rent">Rent</Select.Option>
                      <Select.Option value="ownWithFamily">
                        Own with Family
                      </Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                      <Select.Option value="ownFreeClear">
                        Own Free and Clear
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your date of birth',
                      },
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Social Insurance Number"
                  name="sin"
                  rules={[
                    { required: false, message: 'Please enter your SIN' },
                  ]}
                >
                  <Input placeholder="123-456-789" />
                </Form.Item>
                <Button onClick={handleNext} type="primary">
                  Next
                </Button>
              </Form>
            </fieldset>
          )}

          {/* Step 2: Employment Information */}
          {currentStep === 1 && (
            <fieldset>
              <h2 className="fs-title">Employment Information</h2>
              <h3 className="fs-subtitle">Income & Employment Details</h3>
              <Form layout="vertical" form={employmentForm}>
                <Form.Item
                  label="Self Employed"
                  name="selfEmployed"
                  rules={[
                    {
                      required: true,
                      message: 'Please select if you are self employed',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Employer"
                  name="employer"
                  rules={[
                    { required: true, message: 'Please enter your employer' },
                  ]}
                >
                  <Input placeholder="Company Name" />
                </Form.Item>
                <div className="form-row">
                  <Form.Item label="Employer City" name="employerCity">
                    <Input placeholder="City" />
                  </Form.Item>
                  <Form.Item label="Employer Province" name="employerProvince">
                    <Input placeholder="Province" />
                  </Form.Item>
                  <Form.Item
                    label="Employer Postal Code"
                    name="employerPostalCode"
                  >
                    <Input placeholder="A1A 1A1" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Job Title"
                    name="jobTitle"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your job title',
                      },
                    ]}
                  >
                    <Input placeholder="Software Engineer" />
                  </Form.Item>
                  <Form.Item
                    label="Employment Length (years)"
                    name="employmentLength"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter employment length',
                      },
                    ]}
                  >
                    <Input type="number" placeholder="5" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Monthly Income"
                    name="monthlyIncome"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your monthly income',
                      },
                    ]}
                  >
                    <Input type="number" placeholder="5000" />
                  </Form.Item>
                  <Form.Item label="Other Monthly Income" name="otherIncome">
                    <Input type="number" placeholder="500" />
                  </Form.Item>
                </div>
                <div className="button-row">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </Form>
            </fieldset>
          )}

          {/* Step 3: Financial Information */}
          {currentStep === 2 && (
            <fieldset>
              <h2 className="fs-title">Financial Information</h2>
              <h3 className="fs-subtitle">Credit & Expenses</h3>
              <Form layout="vertical" form={financialForm}>
                <div className="form-row">
                  <Form.Item
                    label="Monthly Expenses"
                    name="monthlyExpenses"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your monthly expenses',
                      },
                    ]}
                  >
                    <Input type="number" placeholder="3000" />
                  </Form.Item>
                  <Form.Item label="Credit Score" name="creditScore">
                    <Input type="number" placeholder="700" />
                  </Form.Item>
                </div>
                <Form.Item label="Outstanding Debts" name="outstandingDebts">
                  <Input.TextArea placeholder="List any outstanding debts (loans, credit cards, etc.)" />
                </Form.Item>
                <Form.Item
                  label="Loan Amount Requested"
                  name="loanAmount"
                  rules={[
                    { required: true, message: 'Please enter the loan amount' },
                  ]}
                >
                  <Input type="number" placeholder="25000" />
                </Form.Item>
                <Form.Item
                  label="Loan Purpose"
                  name="loanPurpose"
                  rules={[
                    {
                      required: true,
                      message: 'Please specify the loan purpose',
                    },
                  ]}
                >
                  <Select placeholder="Select purpose">
                    <Select.Option value="car">Car Purchase</Select.Option>
                    <Select.Option value="home">Home Improvement</Select.Option>
                    <Select.Option value="personal">
                      Personal Loan
                    </Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Do you have a co-applicant?"
                  name="hasCoApplicant"
                  rules={[
                    {
                      required: true,
                      message: 'Please select if you have a co-applicant',
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={(e) => setHasCoApplicant(e.target.value)}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <div className="button-row">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </Form>
            </fieldset>
          )}

          {/* Step 3: Co-Applicant Personal Information */}
          {currentStep === 3 && hasCoApplicant && (
            <fieldset>
              <h2 className="fs-title">Co-Applicant Personal Information</h2>
              <h3 className="fs-subtitle">Basic Details</h3>
              <Form layout="vertical" form={coApplicantPersonalForm}>
                <div className="form-row">
                  <Form.Item
                    label="First Name"
                    name="coApplicantFirstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's first name",
                      },
                    ]}
                  >
                    <Input placeholder="John" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="coApplicantLastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's last name",
                      },
                    ]}
                  >
                    <Input placeholder="Doe" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Email"
                    name="coApplicantEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's email",
                      },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input placeholder="john.doe@example.com" />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="coApplicantPhone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's phone number",
                      },
                      {
                        pattern: /^[0-9\s-+()]*$/,
                        message: 'Please enter a valid phone number',
                      },
                    ]}
                  >
                    <Input placeholder="(123) 456-7890" />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Address"
                  name="coApplicantAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please enter co-applicant's address",
                    },
                  ]}
                >
                  <Input placeholder="123 Main St, City, Province, Postal Code" />
                </Form.Item>
                <div className="form-row">
                  <Form.Item
                    label="City"
                    name="coApplicantCity"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's city",
                      },
                    ]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                  <Form.Item
                    label="Province"
                    name="coApplicantProvince"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's province",
                      },
                    ]}
                  >
                    <Input placeholder="Province" />
                  </Form.Item>
                  <Form.Item
                    label="Postal Code"
                    name="coApplicantPostalCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's postal code",
                      },
                    ]}
                  >
                    <Input placeholder="A1A 1A1" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Residence Status"
                    name="coApplicantResidenceStatus"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please select co-applicant's residence status",
                      },
                    ]}
                  >
                    <Select placeholder="Select residence status">
                      <Select.Option value="rent">Rent</Select.Option>
                      <Select.Option value="ownWithFamily">
                        Own with Family
                      </Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                      <Select.Option value="ownFreeClear">
                        Own Free and Clear
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Date of Birth"
                    name="coApplicantDateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: "Please select co-applicant's date of birth",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Social Insurance Number"
                  name="coApplicantSin"
                  rules={[
                    {
                      required: false,
                      message: "Please enter co-applicant's SIN",
                    },
                  ]}
                >
                  <Input placeholder="123-456-789" />
                </Form.Item>
                <div className="button-row">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </Form>
            </fieldset>
          )}

          {/* Step 4: Co-Applicant Employment Information */}
          {currentStep === 4 && hasCoApplicant && (
            <fieldset>
              <h2 className="fs-title">Co-Applicant Employment Information</h2>
              <h3 className="fs-subtitle">Income & Employment Details</h3>
              <Form layout="vertical" form={coApplicantEmploymentForm}>
                <Form.Item
                  label="Self Employed"
                  name="coApplicantSelfEmployed"
                  rules={[
                    {
                      required: true,
                      message: 'Please select if co-applicant is self employed',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Employer"
                  name="coApplicantEmployer"
                  rules={[
                    {
                      required: true,
                      message: "Please enter co-applicant's employer",
                    },
                  ]}
                >
                  <Input placeholder="Company Name" />
                </Form.Item>
                <div className="form-row">
                  <Form.Item
                    label="Employer City"
                    name="coApplicantEmployerCity"
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                  <Form.Item
                    label="Employer Province"
                    name="coApplicantEmployerProvince"
                  >
                    <Input placeholder="Province" />
                  </Form.Item>
                  <Form.Item
                    label="Employer Postal Code"
                    name="coApplicantEmployerPostalCode"
                  >
                    <Input placeholder="A1A 1A1" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Job Title"
                    name="coApplicantJobTitle"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's job title",
                      },
                    ]}
                  >
                    <Input placeholder="Software Engineer" />
                  </Form.Item>
                  <Form.Item
                    label="Employment Length (years)"
                    name="coApplicantEmploymentLength"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter co-applicant's employment length",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="5" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Monthly Income"
                    name="coApplicantMonthlyIncome"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's monthly income",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="5000" />
                  </Form.Item>
                  <Form.Item
                    label="Other Monthly Income"
                    name="coApplicantOtherIncome"
                  >
                    <Input type="number" placeholder="500" />
                  </Form.Item>
                </div>
                <div className="button-row">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </Form>
            </fieldset>
          )}

          {/* Step 5: Co-Applicant Financial Information */}
          {currentStep === 5 && hasCoApplicant && (
            <fieldset>
              <h2 className="fs-title">Co-Applicant Financial Information</h2>
              <h3 className="fs-subtitle">Credit & Expenses</h3>
              <Form layout="vertical" form={coApplicantFinancialForm}>
                <div className="form-row">
                  <Form.Item
                    label="Monthly Expenses"
                    name="coApplicantMonthlyExpenses"
                    rules={[
                      {
                        required: true,
                        message: "Please enter co-applicant's monthly expenses",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="3000" />
                  </Form.Item>
                  <Form.Item label="Credit Score" name="coApplicantCreditScore">
                    <Input type="number" placeholder="700" />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Outstanding Debts"
                  name="coApplicantOutstandingDebts"
                >
                  <Input.TextArea placeholder="List any outstanding debts (loans, credit cards, etc.)" />
                </Form.Item>
                <div className="button-row">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </Form>
            </fieldset>
          )}

          {/* Step 4/5: Documents */}
          {currentStep === (hasCoApplicant ? 6 : 3) && (
            <fieldset>
              <h2 className="fs-title">Documents</h2>
              <h3 className="fs-subtitle">Upload Required Documents</h3>
              <Form layout="vertical" form={documentsForm}>
                <Form.Item
                  label="Upload Documents (ID, Pay Stubs, Bank Statements, etc.)"
                  name="upload"
                >
                  <ImageUploader
                    fileList={fileList}
                    setFileList={setFileList}
                  />
                </Form.Item>
                <Form.Item label="Additional Notes" name="notes">
                  <Input.TextArea placeholder="Any additional information..." />
                </Form.Item>

                <Form.Item
                  name="consent"
                  valuePropName="checked"
                  rules={[
                    { required: true, message: 'You must consent to proceed' },
                  ]}
                  style={{
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Checkbox
                    onChange={(e) => setConsentChecked(e.target.checked)}
                  >
                    <span style={{ fontSize: '12px' }}>
                      By clicking Submit Application, I consent to the
                      collection, use and disclosure of my personal information
                      as described in this paragraph. I agree that the personal
                      information provided above may be used and disclosed by
                      Zilla Finance and/or its agents or service providers as
                      necessary to obtain credit, financial and related personal
                      information (including a credit or consumer information
                      report) about me from any credit bureau or credit
                      reporting agency, and to advise me on credit availability
                      in connection with product and/or service purchase
                      financing. I further agree that the personal information
                      provided above may be disclosed to the provider of Zilla
                      Finance hosting or related services for the purpose of
                      enabling Zilla Finance to access my personal information.
                      Personal information I provide and credit information
                      obtained may also be retained by Zilla Finance and used to
                      facilitate the application process should I subsequently
                      choose to apply for credit through Zilla Finance.
                    </span>
                  </Checkbox>
                </Form.Item>

                <div className="button-row">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={!consentChecked}
                  >
                    Submit Application
                  </Button>
                </div>
              </Form>
            </fieldset>
          )}

          {/* Step 5/6: Success */}
          {currentStep === 8 && (
            <fieldset>
              <h2 className="fs-title">Application Submitted Successfully!</h2>
              <h3 className="fs-subtitle">Thank you for your application</h3>
              <p>
                One of our representatives will contact you within 1-2 business
                days.
              </p>
              <Button onClick={() => setCurrentStep(0)}>
                Submit Another Application
              </Button>
            </fieldset>
          )}
        </div>
      </div>

      {/* Modal for document preview */}
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        width={800}
      >
        {previewImage.includes('data:application/pdf') ? (
          <iframe
            src={previewImage}
            style={{ width: '100%', height: '600px', border: 'none' }}
            title="PDF Preview"
          />
        ) : (
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        )}
      </Modal>
    </div>
  );
};

export default PreApproveForm;
