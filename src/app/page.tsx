'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Wrench, Droplets, Thermometer, Shield, ExternalLink, Code, Zap } from 'lucide-react'

declare global {
  interface Window {
    wvSdk: {
      openModal: (config: {
        type: string;
        publicKey: string;
        formId: string;
        showMetrics: number;
      }) => void;
    };
    openProcuredForm?: () => void;
    testWvSdk?: unknown;
    [key: string]: unknown;
  }
}

export default function JoesPlumbing() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [showIntegrationDemo, setShowIntegrationDemo] = useState(false)
  const [sdkLoaded, setSdkLoaded] = useState(false)

  useEffect(() => {
    // The official Procured SDK at https://sdk.procured.us/wvSdk.js is currently corrupted
    // We'll use direct URL approach instead as recommended in their documentation
    console.log('🔧 PROCURED INTEGRATION: Using direct URL approach due to SDK corruption');
    setSdkLoaded(true);
  }, []);

  const openProcuredForm = () => {
    setShowContactForm(true)
  }

  const openProcuredModal = () => {
    console.log('🚀 Opening Procured Form Modal...');
    // Since the official SDK is corrupted, we'll use the iframe integration approach
    // This creates a modal-like experience using the working form URL
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    const iframe = document.createElement('iframe');
    iframe.src = 'https://forms.procured.us/?formId=51a775ef-1817-4615-a985-ea85533afd1e&publicKey=207c90d1-b7b2-4b71-a0cd-0aa970ee9337&mode=popup';
    iframe.style.cssText = `
      width: 90%;
      max-width: 800px;
      height: 90%;
      max-height: 600px;
      border: none;
      border-radius: 10px;
      background: white;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      z-index: 10001;
    `;

    closeBtn.onclick = () => document.body.removeChild(modal);
    modal.onclick = (e) => {
      if (e.target === modal) document.body.removeChild(modal);
    };

    modal.appendChild(iframe);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
  }

  const openProcuredWithMeasurements = () => {
    console.log('🔧 Opening Procured Measurements Modal...');
    // Since the official SDK is corrupted, we'll use the iframe integration approach
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    const iframe = document.createElement('iframe');
    iframe.src = 'https://measure.procured.us/workflow?publicKey=207c90d1-b7b2-4b71-a0cd-0aa970ee9337&formId=51a775ef-1817-4615-a985-ea85533afd1e&sm=1&flow=request&mode=popup';
    iframe.style.cssText = `
      width: 95%;
      max-width: 1200px;
      height: 95%;
      max-height: 800px;
      border: none;
      border-radius: 10px;
      background: white;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      z-index: 10001;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;

    closeBtn.onclick = () => document.body.removeChild(modal);
    modal.onclick = (e) => {
      if (e.target === modal) document.body.removeChild(modal);
    };

    modal.appendChild(iframe);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
  }

  const openInNewTab = () => {
    window.open('https://forms.procured.us/?formId=51a775ef-1817-4615-a985-ea85533afd1e&publicKey=207c90d1-b7b2-4b71-a0cd-0aa970ee9337&mode=tab', '_blank');
  }

  const openMeasurementsTab = () => {
    window.open('https://measure.procured.us/workflow?publicKey=207c90d1-b7b2-4b71-a0cd-0aa970ee9337&formId=51a775ef-1817-4615-a985-ea85533afd1e&sm=1&flow=request', '_blank');
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Wrench className="h-8 w-8 text-blue-300" />
            <div>
              <h1 className="text-2xl font-bold">Joe&apos;s Plumbing</h1>
              <p className="text-blue-200 text-sm">Professional • Reliable • Licensed</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-PIPE</span>
            </div>
            <button
              onClick={openProcuredForm}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            EXAMPLE FOR PROCURED FORMS
          </h2>
        <h2 className="text-5xl font-bold text-gray-800 mb-6">This is not a real website.</h2>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            With over 15 years of experience, Joe&apos;s Plumbing provides top-quality plumbing solutions
            for your home and business. Available 24/7 for emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openProcuredForm}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Request Service Now
            </button>
            <a
              href="tel:5551234pipe"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Call (555) 123-PIPE
            </a>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Procured Integration Demo</h3>
              <p className="text-gray-600">As a Procured subscriber, you can use any of these integration methods on your website</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <Zap className="h-6 w-6 text-blue-500 mr-2" />
                  <h4 className="font-semibold">Popup Modal</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Opens form in an overlay modal</p>
                <button
                  onClick={openProcuredModal}
                  className={`w-full px-4 py-2 rounded text-sm transition-colors text-white ${
                    sdkLoaded
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!sdkLoaded}
                >
                  {sdkLoaded ? 'Try Popup Modal' : 'Loading SDK...'}
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <ExternalLink className="h-6 w-6 text-green-500 mr-2" />
                  <h4 className="font-semibold">New Tab</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Opens form in a new browser tab</p>
                <button
                  onClick={openInNewTab}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Open in New Tab
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <Code className="h-6 w-6 text-purple-500 mr-2" />
                  <h4 className="font-semibold">Embedded Form</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Embed form directly in page</p>
                <button
                  onClick={() => setShowIntegrationDemo(!showIntegrationDemo)}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  {showIntegrationDemo ? 'Hide' : 'Show'} Embedded
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <Wrench className="h-6 w-6 text-orange-500 mr-2" />
                  <h4 className="font-semibold">With Measurements</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Request with measurement tools</p>
                <button
                  onClick={openProcuredWithMeasurements}
                  className={`w-full px-4 py-2 rounded text-sm transition-colors text-white ${
                    sdkLoaded
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!sdkLoaded}
                >
                  {sdkLoaded ? 'Try With Measurements' : 'Loading SDK...'}
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <ExternalLink className="h-6 w-6 text-red-500 mr-2" />
                  <h4 className="font-semibold">Measurements Tab</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Measurements in new tab</p>
                <button
                  onClick={openMeasurementsTab}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Open Measurements
                </button>
              </div>
            </div>

            {showIntegrationDemo && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold mb-3">Embedded Form Demo:</h5>
                <div className="procured-container" style={{height: '600px'}}>
                  <iframe
                    src="https://forms.procured.us/?formId=51a775ef-1817-4615-a985-ea85533afd1e&publicKey=207c90d1-b7b2-4b71-a0cd-0aa970ee9337&mode=form"
                    width="100%"
                    height="100%"
                    style={{border: 'none'}}
                    title="Procured Form"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Droplets className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Leak Repairs</h4>
              <p className="text-gray-600">Quick detection and repair of all types of leaks to prevent water damage.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Thermometer className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Water Heaters</h4>
              <p className="text-gray-600">Installation, repair, and maintenance of traditional and tankless water heaters.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Wrench className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Pipe Installation</h4>
              <p className="text-gray-600">Professional pipe installation and replacement for residential and commercial properties.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Emergency Service</h4>
              <p className="text-gray-600">24/7 emergency plumbing services for urgent repairs and water emergencies.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-6">About Joe</h3>
              <p className="text-gray-600 mb-4">
                Hi, I&apos;m Joe, and I&apos;ve been serving the greater metro area for over 15 years.
                What started as a small family business has grown into the most trusted plumbing service in the region.
              </p>
              <p className="text-gray-600 mb-4">
                I believe in honest work, fair pricing, and treating every customer like family.
                When you call Joe&apos;s Plumbing, you&apos;re not just getting a plumber – you&apos;re getting a neighbor who cares.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>✓ Licensed & Insured</li>
                <li>✓ 15+ Years Experience</li>
                <li>✓ Family Owned & Operated</li>
                <li>✓ 100% Satisfaction Guarantee</li>
              </ul>
            </div>
            <div className="bg-blue-100 p-8 rounded-lg">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍🔧</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Joe</h4>
                <p className="text-gray-600 mb-4">Master Plumber & Owner</p>
                <div className="text-yellow-500 text-xl mb-2">⭐⭐⭐⭐⭐</div>
                <p className="text-sm text-gray-600">4.9/5 stars from 200+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">Ready to Get Started?</h3>
          <p className="text-xl mb-12 text-blue-200">
            Don&apos;t let plumbing problems disrupt your day. Contact us now for fast, professional service.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-blue-300 mb-3" />
              <h4 className="text-lg font-semibold mb-2">Call Us</h4>
              <p className="text-blue-200">(555) 123-PIPE</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-blue-300 mb-3" />
              <h4 className="text-lg font-semibold mb-2">Email Us</h4>
              <p className="text-blue-200">joe@joesplumbing.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-blue-300 mb-3" />
              <h4 className="text-lg font-semibold mb-2">Service Area</h4>
              <p className="text-blue-200">Metro Area & Suburbs</p>
            </div>
          </div>

          <button
            onClick={openProcuredForm}
            className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors"
          >
            Get Your Free Quote Today
          </button>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Wrench className="h-6 w-6 text-blue-300" />
            <span className="text-xl font-bold text-white">Joe&apos;s Plumbing</span>
          </div>
          <p className="mb-4">Licensed, Insured, and Committed to Excellence</p>
          <p className="text-sm text-gray-400">
            © 2024 Joe&apos;s Plumbing. All rights reserved. | License #PL-12345
          </p>
        </div>
      </footer>

      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Contact Joe&apos;s Plumbing</h3>
            <p className="text-gray-600 mb-6">
              This is where your Procured form would be integrated.
              For now, please call us directly at (555) 123-PIPE.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowContactForm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors"
              >
                Close
              </button>
              <a
                href="tel:5551234pipe"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}