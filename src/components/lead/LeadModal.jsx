import { useState } from 'react';
import { Modal, Form, Input, Checkbox, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import ThankYou from './ThankYou';

const FREE_DOMAINS = ['gmail.', 'hotmail.', 'yahoo.', 'outlook.', 'icloud.', 'proton.'];

export default function LeadModal({ open, onClose, onSubmit, leadSubmitted }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);

  const handleEmailBlur = (e) => {
    const val = e.target.value.toLowerCase();
    setEmailWarning(FREE_DOMAINS.some(d => val.includes(d)));
  };

  const handleFinish = async (values) => {
    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={520}
      centered
      styles={{ content: { background: '#111117', border: '1px solid #252530', borderRadius: '16px', padding: '40px' } }}
      closeIcon={<span style={{ color: '#5C5C70', fontSize: '18px' }}>×</span>}
    >
      {leadSubmitted ? (
        <ThankYou />
      ) : (
        <>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: '#00D4A8', fontSize: '12px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              background: 'rgba(0,212,168,0.1)', border: '1px solid rgba(0,212,168,0.2)',
              borderRadius: '100px', padding: '4px 12px', marginBottom: '16px',
            }}>
              <LockOutlined style={{ fontSize: '11px' }} />
              Free report
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              Unlock your full cost breakdown
            </h3>
            <p style={{ fontSize: '14px', color: '#9191A4', lineHeight: 1.6 }}>
              We'll send a personalised summary to your email — no spam, ever.
            </p>
          </div>

          <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0 16px' }}>
              <Form.Item
                name="name"
                label={<span style={labelStyle}>Full name</span>}
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input size="large" placeholder="Jane Smith" style={inputStyle} />
              </Form.Item>

              <Form.Item
                name="company"
                label={<span style={labelStyle}>Company</span>}
                rules={[{ required: true, message: 'Please enter your company' }]}
              >
                <Input size="large" placeholder="Acme Corp" style={inputStyle} />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label={<span style={labelStyle}>Work email</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
              extra={emailWarning
                ? <span style={{ color: '#F5A623', fontSize: '12px' }}>Personal emails may delay response. A work email helps us get back to you faster.</span>
                : null
              }
            >
              <Input
                size="large"
                placeholder="jane@company.com"
                style={inputStyle}
                onBlur={handleEmailBlur}
                onChange={() => setEmailWarning(false)}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span style={labelStyle}>Phone (optional)</span>}
            >
              <Input size="large" placeholder="+1 555 000 0000" style={inputStyle} />
            </Form.Item>

            <Form.Item name="contactConsent" valuePropName="checked" initialValue={true}>
              <Checkbox style={{ color: '#9191A4', fontSize: '13px' }}>
                I'd like to be contacted by a workspace consultant
              </Checkbox>
            </Form.Item>

            <p style={{ fontSize: '12px', color: '#5C5C70', marginBottom: '20px', lineHeight: 1.5 }}>
              By submitting you agree to our Privacy Policy. We never sell your data.
            </p>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{ width: '100%', height: '52px', fontWeight: 600, fontSize: '16px', boxShadow: '0 0 24px rgba(0,212,168,0.25)' }}
            >
              Send me the report →
            </Button>
          </Form>
        </>
      )}
    </Modal>
  );
}

const labelStyle = { fontSize: '13px', fontWeight: 500, color: '#9191A4' };
const inputStyle = { background: '#1A1A24', borderColor: '#252530' };
