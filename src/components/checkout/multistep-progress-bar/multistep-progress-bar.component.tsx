import { useEffect, useState } from 'react'

import { CheckoutStep } from 'shared/types/checkout-steps'

import './multistep-progress-bar.scss'

type MultistepProgressBarProps = {
  activeStep: number
  steps: CheckoutStep[]
}

const MultistepProgressBar = ({ activeStep, steps }: MultistepProgressBarProps) => {
  const totalSteps = steps.length
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`

  useEffect(() => {
    document.documentElement.style.setProperty('--step-width', width);
  }, [width])

  return (
    <div className='multistep-progress-bar-container'>
      <div className="step-container">
        {steps.map(({ step, label }) => (
          <div className="step-wrapper" key={step}>
            <div
              className={`step-style ${activeStep >= step ? 'completed' : 'incomplete'}`}
            >
              {activeStep > step || activeStep === steps.length ? (
                <div className="check-mark">L</div>
              ) : (
                <span className="step-count">{step}</span>
              )}
            </div>
            <div className="steps-label-container">
              <span className="step-label" key={step}>
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultistepProgressBar