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
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './preApprove.css';
import { registerChildren } from './preApprove.service';
const PreApproveForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalForm] = Form.useForm();
  const [employmentForm] = Form.useForm();
  const [financialForm] = Form.useForm();
  const [authorizedPickupsForm] = Form.useForm();
  const [coApplicantPersonalForm] = Form.useForm();
  const [documentsForm] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasSecondaryParent, setHasSecondaryParent] = useState(null);
  const [specialExerciseDiet, setSpecialExerciseDiet] = useState(null);
  const [peanutAllergy, setPeanutAllergy] = useState(null);
  const [authorizedPickups, setAuthorizedPickups] = useState([{ id: 0 }]);
  const [consentChecked, setConsentChecked] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const submitData = { ...formData };

      // Add fileList and user to submitData

      submitData.user = user;

      // Transform authorized pickups into an array
      const authorizedPickupsArray = [];
      let index = 0;
      while (submitData[`authorized_pickup_email_${index}`] !== undefined) {
        authorizedPickupsArray.push({
          email: submitData[`authorized_pickup_email_${index}`],
          legal_name: submitData[`authorized_pickup_legal_name_${index}`],
          phone: submitData[`authorized_pickup_phone_${index}`],
          relation: submitData[`authorized_pickup_relation_${index}`],
        });
        delete submitData[`authorized_pickup_email_${index}`];
        delete submitData[`authorized_pickup_legal_name_${index}`];
        delete submitData[`authorized_pickup_phone_${index}`];
        delete submitData[`authorized_pickup_relation_${index}`];
        index++;
      }
      submitData.authorized_pickups = authorizedPickupsArray;

      // Format date if present
      if (submitData.dateOfBirth) {
        submitData.dateOfBirth = dayjs(submitData.dateOfBirth).format(
          'YYYY-MM-DD'
        );
      }

      const result = await registerChildren(submitData, fileList);

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
        documentsForm.resetFields();
        setFormData({});
        setCurrentStep(hasSecondaryParent ? 7 : 6); // Go to success step
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getMaxStep = () => {
    if (hasSecondaryParent === null) return 2; // Before deciding secondary parent
    if (hasSecondaryParent) return 6; // Personal(0), Employment(1), Health(2), SecondaryParent(3), AuthorizedPickups(4), Documents(5), Success(6)
    return 5; // Personal(0), Employment(1), Health(2), AuthorizedPickups(3), Documents(4), Success(5)
  };

  const handleNext = () => {
    const maxStep = getMaxStep();
    if (currentStep < maxStep) {
      let formToValidate;
      if (currentStep === 0) formToValidate = personalForm;
      else if (currentStep === 1) formToValidate = employmentForm;
      else if (currentStep === 2) formToValidate = financialForm;
      else if (currentStep === 3 && hasSecondaryParent)
        formToValidate = coApplicantPersonalForm;
      else if (
        (currentStep === 3 && !hasSecondaryParent) ||
        (currentStep === 4 && hasSecondaryParent)
      )
        formToValidate = authorizedPickupsForm;
      else if (
        (currentStep === 4 && !hasSecondaryParent) ||
        (currentStep === 5 && hasSecondaryParent)
      )
        formToValidate = documentsForm;

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

  const addAuthorizedPickup = () => {
    setAuthorizedPickups([
      ...authorizedPickups,
      { id: authorizedPickups.length },
    ]);
  };

  const removeAuthorizedPickup = (id) => {
    setAuthorizedPickups(
      authorizedPickups.filter((pickup) => pickup.id !== id)
    );
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="preapprove-full-bg">
      <div className="preapprove-overlay">
        <div className="multi-step-form">
          <ul id="progressbar">
            <li className={currentStep >= 0 ? 'active' : ''}>Child Info</li>
            <li className={currentStep >= 1 ? 'active' : ''}>Primary Parent</li>
            <li className={currentStep >= 2 ? 'active' : ''}>Health Info</li>
            {hasSecondaryParent && (
              <li className={currentStep >= 3 ? 'active' : ''}>
                Secondary Parent
              </li>
            )}
            <li
              className={
                currentStep >= (hasSecondaryParent ? 4 : 3) ? 'active' : ''
              }
            >
              Authorized Pickups
            </li>
            <li
              className={
                currentStep >= (hasSecondaryParent ? 5 : 4) ? 'active' : ''
              }
            >
              Documents
            </li>
            <li
              className={
                currentStep >= (hasSecondaryParent ? 7 : 6) ? 'active' : ''
              }
            >
              Success
            </li>
          </ul>

          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <fieldset>
              <h2 className="fs-title">Child Information</h2>
              <h3 className="fs-subtitle">Basic Details</h3>
              <Form layout="vertical" form={personalForm}>
                <div className="form-row">
                  <Form.Item
                    label="Legal Child First Name"
                    name="first_name"
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
                    label="Legal Child Last Name"
                    name="last_name"
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
                    label="Child Middle Name"
                    name="child_middle_name"
                    // rules={[
                    //   { required: true, message: 'Please enter your email' },
                    //   { type: 'email', message: 'Please enter a valid email' },
                    // ]}
                  >
                    <Input placeholder="Danni" />
                  </Form.Item>
                  <Form.Item
                    label="Child Preferred Name"
                    name="preferred_name"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please enter your preferred name',
                    //   },
                    // ]}
                  >
                    <Input placeholder="Joe" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="First Language Spoken"
                    name="first_language_spoken"
                    // rules={[
                    //   { required: true, message: 'Please enter your address' },
                    // ]}
                  >
                    <Input placeholder="Arabic" />
                  </Form.Item>
                  <Form.Item
                    label="Second Language Spoken"
                    name="second_language_spoken"
                    // rules={[
                    //   { required: true, message: 'Please enter your address' },
                    // ]}
                  >
                    <Input placeholder="Arabic" />
                  </Form.Item>
                </div>
                {/* <div className="form-row">
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
                </div> */}
                <div className="form-row">
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your child gender',
                      },
                    ]}
                  >
                    <Select placeholder="Select child gender">
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                      <Select.Option value="unknown">Unknown</Select.Option>
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
                    <DatePicker
                      style={{ width: '100%' }}
                      disabledDate={(current) =>
                        current && current > dayjs().endOf('day')
                      }
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Religious Preference"
                  name="religious_preference"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please select if you are self employed',
                  //   },
                  // ]}
                >
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                {/* <Form.Item
                  label="Social Insurance Number"
                  name="sin"
                  rules={[
                    { required: false, message: 'Please enter your SIN' },
                  ]}
                >
                  <Input placeholder="123-456-789" />
                </Form.Item> */}
                <Button onClick={handleNext} type="primary">
                  Next
                </Button>
              </Form>
            </fieldset>
          )}

          {/* Step 2: Employment Information */}
          {currentStep === 1 && (
            <fieldset>
              <h2 className="fs-title">Primary Parent</h2>
              <h3 className="fs-subtitle">Guardian Information Details</h3>
              <Form layout="vertical" form={employmentForm}>
                {/* <Form.Item
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
                </Form.Item> */}
                <div className="form-row">
                  <Form.Item
                    label="Legal First Name"
                    name="primary_parent_legal_first_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your legal first name',
                      },
                    ]}
                  >
                    <Input placeholder="Jessica" />
                  </Form.Item>
                  <Form.Item
                    label="Legal Last Name"
                    name="primary_parent_legal_last_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your legal last name',
                      },
                    ]}
                  >
                    <Input placeholder="Doe" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[
                      { required: true, message: 'Please enter your Contry' },
                    ]}
                  >
                    <Input placeholder="Canada" />
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      { required: true, message: 'Please enter your address' },
                    ]}
                  >
                    <Input placeholder="123 somewhere NE" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item label="City" name="parent_city">
                    <Input placeholder="Calgary" />
                  </Form.Item>
                  <Form.Item label="Province" name="parent_province">
                    <Input placeholder="Alberta/AB" />
                  </Form.Item>
                  <Form.Item label="Postal Code" name="parent_postal_code">
                    <Input placeholder="A1A 1A1" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Email Address"
                    name="primary_parent_email_address"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email address',
                      },
                      {
                        type: 'email',
                        message: 'Please enter a valid email',
                      },
                    ]}
                  >
                    <Input placeholder="jessica.doe@outlook.com" />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="primary_parent_phone"
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
                  {/* <Form.Item
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
                  </Form.Item> */}
                </div>

                <Form.Item
                  label="Status"
                  name="primary_parent_status"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your status',
                    },
                  ]}
                >
                  <Select placeholder="Select status">
                    <Select.Option value="Married">Married</Select.Option>
                    <Select.Option value="Single">Single</Select.Option>
                    <Select.Option value="Separated">Separated</Select.Option>
                    <Select.Option value="Divorced">Divorced</Select.Option>
                    <Select.Option value="Common-law">Common-law</Select.Option>
                    <Select.Option value="Widowed">Widowed</Select.Option>
                    <Select.Option value="Co-parenting / Shared custody">
                      Co-parenting / Shared custody
                    </Select.Option>
                    <Select.Option value="Guardian (non-parent)">
                      Guardian (non-parent)
                    </Select.Option>
                  </Select>
                </Form.Item>

                <div className="form-row">
                  <Form.Item label="Work Name" name="primary_parent_work_name">
                    <Input placeholder="Company Name" />
                  </Form.Item>
                  <Form.Item label="Address" name="primary_parent_work_address">
                    <Input placeholder="123 somewhere NE" />
                  </Form.Item>
                </div>

                <div className="form-row">
                  <Form.Item label="Work City" name="primary_parent_work_city">
                    <Input placeholder="Calgary" />
                  </Form.Item>
                  <Form.Item
                    label="Work Province"
                    name="primary_parent_work_province"
                  >
                    <Input placeholder="Alberta/AB" />
                  </Form.Item>
                  <Form.Item
                    label="Work Postal Code"
                    name="primary_parent_work_postal_code"
                  >
                    <Input placeholder="A1A 1A1" />
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

          {/* Step 3: Health Information */}
          {currentStep === 2 && (
            <fieldset>
              <h2 className="fs-title">Health Information</h2>
              <h3 className="fs-subtitle">Diet & Allergies</h3>
              <Form
                layout="vertical"
                form={financialForm}
                onValuesChange={(changedValues) => {
                  if (changedValues.specialExerciseDiet === false) {
                    financialForm.setFieldsValue({
                      specialExerciseDietDetails: '',
                    });
                  }
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <Form.Item
                    label="Does the child have a special exercise diet?"
                    name="specialExerciseDiet"
                    rules={[
                      {
                        required: true,
                        message:
                          'Please select if the child has a special exercise diet',
                      },
                    ]}
                  >
                    <Radio.Group
                      onChange={(e) => {
                        setSpecialExerciseDiet(e.target.value);
                        if (!e.target.value) {
                          financialForm.setFieldsValue({
                            specialExerciseDietDetails: '',
                          });
                        }
                      }}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label="Special Exercise Diet Details"
                    name="specialExerciseDietDetails"
                    rules={[
                      {
                        required: specialExerciseDiet === true,
                        message:
                          'Please provide details about the special exercise diet',
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Please describe the child's special exercise diet requirements..."
                      disabled={specialExerciseDiet !== true}
                    />
                  </Form.Item>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Form.Item
                    label="Does the child have any allergies?"
                    name="generalAllergy"
                    rules={[
                      {
                        required: true,
                        message: 'Please select if the child has any allergies',
                      },
                    ]}
                  >
                    <Radio.Group
                      onChange={(e) => {
                        setPeanutAllergy(e.target.value); // reusing state for general
                        if (!e.target.value) {
                          financialForm.setFieldsValue({
                            generalAllergyDetails: '',
                          });
                        }
                      }}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label="Allergy Details"
                    name="generalAllergyDetails"
                    rules={[
                      {
                        required: peanutAllergy === true, // reusing state
                        message: 'Please provide details about the allergies',
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Please describe the allergies, reactions, or restrictions..."
                      disabled={peanutAllergy !== true}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Do you have a secondary parent?"
                  name="hasSecondaryParent"
                  rules={[
                    {
                      required: true,
                      message: 'Please select if you have a secondary parent',
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={(e) => setHasSecondaryParent(e.target.value)}
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

          {/* Step 3/4: Authorized Pickups */}
          {((currentStep === 3 && !hasSecondaryParent) ||
            (currentStep === 4 && hasSecondaryParent)) && (
            <fieldset>
              <h2 className="fs-title">Authorized Pickups</h2>
              <h3 className="fs-subtitle">Authorized Pickup Details</h3>
              <Form layout="vertical" form={authorizedPickupsForm}>
                {authorizedPickups.map((pickup, index) => (
                  <div
                    key={pickup.id}
                    style={{
                      marginBottom: '20px',
                      border: '1px solid #d9d9d9',
                      padding: '10px',
                      borderRadius: '4px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <h4>Pickup {index + 1}</h4>
                      {authorizedPickups.length > 1 && (
                        <Button
                          type="link"
                          danger
                          onClick={() => removeAuthorizedPickup(pickup.id)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="form-row">
                      <Form.Item
                        label="Legal Name"
                        name={`authorized_pickup_legal_name_${pickup.id}`}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the legal name',
                          },
                        ]}
                      >
                        <Input placeholder="John Doe" />
                      </Form.Item>
                      <Form.Item
                        label="Phone"
                        name={`authorized_pickup_phone_${pickup.id}`}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the phone number',
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
                    <div className="form-row">
                      <Form.Item
                        label="Relation to the Child"
                        name={`authorized_pickup_relation_${pickup.id}`}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the relation to the child',
                          },
                        ]}
                      >
                        <Input placeholder="Grandparent" />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name={`authorized_pickup_email_${pickup.id}`}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the email address',
                          },
                          {
                            type: 'email',
                            message: 'Please enter a valid email',
                          },
                        ]}
                      >
                        <Input placeholder="john.doe@example.com" />
                      </Form.Item>
                    </div>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={addAuthorizedPickup}
                  style={{ width: '100%', marginBottom: '20px' }}
                  disabled={authorizedPickups.length >= 2}
                >
                  Add Another Authorized Pickup (Max 2)
                </Button>

                <div className="button-row">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </Form>
            </fieldset>
          )}

          {/* Step 3: Secondary Parent */}
          {currentStep === 3 && hasSecondaryParent && (
            <fieldset>
              <h2 className="fs-title">Secondary Parent</h2>
              <h3 className="fs-subtitle">Guardian Information Details</h3>
              <Form layout="vertical" form={coApplicantPersonalForm}>
                <div className="form-row">
                  <Form.Item
                    label="Legal First Name"
                    name="secondary_parent_legal_first_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your legal first name',
                      },
                    ]}
                  >
                    <Input placeholder="Jessica" />
                  </Form.Item>
                  <Form.Item
                    label="Legal Last Name"
                    name="secondary_parent_legal_last_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your legal last name',
                      },
                    ]}
                  >
                    <Input placeholder="Doe" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Country"
                    name="secondary_country"
                    rules={[
                      { required: true, message: 'Please enter your Contry' },
                    ]}
                  >
                    <Input placeholder="Canada" />
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    name="secondary_address"
                    rules={[
                      { required: true, message: 'Please enter your address' },
                    ]}
                  >
                    <Input placeholder="123 somewhere NE" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item label="City" name="secondary_parent_city">
                    <Input placeholder="Calgary" />
                  </Form.Item>
                  <Form.Item label="Province" name="secondary_parent_province">
                    <Input placeholder="Alberta/AB" />
                  </Form.Item>
                  <Form.Item
                    label="Postal Code"
                    name="secondary_parent_postal_code"
                  >
                    <Input placeholder="A1A 1A1" />
                  </Form.Item>
                </div>
                <div className="form-row">
                  <Form.Item
                    label="Email Address"
                    name="secondary_parent_email_address"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email address',
                      },
                      {
                        type: 'email',
                        message: 'Please enter a valid email',
                      },
                    ]}
                  >
                    <Input placeholder="jessica.doe@outlook.com" />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="secondary_parent_phone"
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

                <div className="form-row">
                  <Form.Item
                    label="Work Name"
                    name="secondary_parent_work_name"
                  >
                    <Input placeholder="Company Name" />
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    name="secondary_parent_work_address"
                  >
                    <Input placeholder="123 somewhere NE" />
                  </Form.Item>
                </div>

                <div className="form-row">
                  <Form.Item
                    label="Work City"
                    name="secondary_parent_work_city"
                  >
                    <Input placeholder="Calgary" />
                  </Form.Item>
                  <Form.Item
                    label="Work Province"
                    name="secondary_parent_work_province"
                  >
                    <Input placeholder="Alberta/AB" />
                  </Form.Item>
                  <Form.Item
                    label="Work Postal Code"
                    name="secondary_parent_work_postal_code"
                  >
                    <Input placeholder="A1A 1A1" />
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

          {/* Step 4/5: Documents */}
          {((currentStep === 4 && !hasSecondaryParent) ||
            (currentStep === 5 && hasSecondaryParent)) && (
            <fieldset>
              <h2 className="fs-title">Documents</h2>
              <h3 className="fs-subtitle">Upload Required Documents</h3>
              <Form layout="vertical" form={documentsForm}>
                <Form.Item
                  label="Upload Image"
                  name="documents"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload an image',
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={() => false} // Prevent auto upload
                    accept="image/*"
                    maxCount={1}
                  >
                    {fileList.length >= 1 ? null : (
                      <div>
                        <div style={{ marginTop: 8 }}>Upload Image</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="consent"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      message: 'Please provide consent to proceed',
                    },
                  ]}
                >
                  <Checkbox
                    onChange={(e) => setConsentChecked(e.target.checked)}
                  >
                    By submitting this application, I consent to the collection,
                    use, and sharing of personal information for the purpose of
                    child registration and daycare services.
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
          {((currentStep === 6 && !hasSecondaryParent) ||
            (currentStep === 7 && hasSecondaryParent)) && (
            <fieldset>
              <h2 className="fs-title">Application Submitted Successfully!</h2>
              <h3 className="fs-subtitle">Thank you for your application</h3>
              <p>
                One of our representatives will contact you within 1-2 business
                days.
              </p>
              <div className="button-row">
                <Button onClick={() => setCurrentStep(0)}>
                  Submit Another Application
                </Button>
                <Button
                  type="primary"
                  onClick={() => navigate(`/dashboard/${user.parent_id}`)}
                >
                  Go to Dashboard
                </Button>
              </div>
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
