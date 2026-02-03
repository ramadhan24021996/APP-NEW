import React from 'react';
import Icon from './Icon';
import { onboardingData } from '../constants';
import { Column, Row, Box, Spacer } from './Layout';

const Onboarding = ({ step, onNext }) => {
    const data = onboardingData[step];

    return (
        <Column className="onboarding" align="center" justify="center">
            <div className="onboarding-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <Column className="onboarding-content animate" align="center" style={{ maxWidth: 450 }}>
                <Box style={{
                    width: 120, height: 120, borderRadius: 36, background: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818cf8', transform: 'rotate(-5deg)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                }}>
                    <Icon name={data.icon} size={56} />
                </Box>

                <Spacer size={48} />

                <h1 style={{
                    fontSize: 'clamp(28px, 8vw, 36px)', fontWeight: 950, marginBottom: 20, lineHeight: 1.1, color: 'white',
                    whiteSpace: 'pre-line', textAlign: 'center'
                }}>{data.title}</h1>
                
                <p style={{
                    fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
                    maxWidth: 320, textAlign: 'center', fontWeight: 500
                }}>{data.desc}</p>

                <Spacer size={48} />

                <Row justify="center" gap={10}>
                    {onboardingData.map((_, i) => (
                        <div key={i} style={{
                            width: i === step ? 36 : 10, height: 10, borderRadius: 12,
                            background: i === step ? '#6366f1' : 'rgba(255,255,255,0.1)',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: i === step ? '0 0 15px rgba(99, 102, 241, 0.5)' : 'none'
                        }}></div>
                    ))}
                </Row>

                <Spacer size={48} />

                <button onClick={onNext} className="btn-primary" style={{
                    width: '100%', padding: '20px', borderRadius: 24, fontSize: 16, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
                    boxShadow: '0 25px 50px rgba(99, 102, 241, 0.3)'
                }}>
                    {step === 2 ? 'MULAI SEKARANG' : 'LANJUTKAN'}
                    <Icon name="arrow-right" size={22} />
                </button>
            </Column>
        </Column>
    );
};

export default Onboarding;
