'use client'

import { useState, useEffect } from 'react'

// From EmbedFormModal.tsx - the exact embed codes users will copy-paste
const formId = "51a775ef-1817-4615-a985-ea85533afd1e"
const publicKey = "207c90d1-b7b2-4b71-a0cd-0aa970ee9337"
const SDK_URL = "https://sdk.procured.us"
const FORMS_URL = "https://forms.procured.us"
const REQUEST_URL = "https://measure.procured.us"

declare global {
  interface Window {
    wvSdk: {
      openModal: (config: {
        type: string;
        publicKey: string;
        formId?: string;
        showMetrics?: number;
      }) => void;
    };
    openProcuredForm?: () => void;
  }
}

export default function ProcuredEmbeds() {
  const [showEmbeddedForm, setShowEmbeddedForm] = useState(false)
  const [showMetrics, setShowMetrics] = useState(true)

  useEffect(() => {
    // Load the actual Procured SDK
    const script = document.createElement('script')
    script.src = `${SDK_URL}/wvSdk.js`
    script.async = true
    document.head.appendChild(script)

    // Define the openProcuredForm function that users will use
    window.openProcuredForm = function() {
      if (window.wvSdk) {
        window.wvSdk.openModal({
          type: "wv-modal",
          publicKey: publicKey,
          formId: formId,
          showMetrics: showMetrics ? 1 : 0
        })
      }
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [showMetrics])

  // 1. Standard Popup Modal
  const openStandardPopup = () => {
    if (window.wvSdk) {
      window.wvSdk.openModal({
        type: "wv-modal",
        publicKey: publicKey,
        formId: formId,
        showMetrics: showMetrics ? 1 : 0
      })
    }
  }

  // 2. Measurements Popup Modal
  const openMeasurementsPopup = () => {
    if (window.wvSdk) {
      window.wvSdk.openModal({
        type: "wv-instant-request-modal",
        publicKey: publicKey,
        formId: formId,
        showMetrics: showMetrics ? 1 : 0
      })
    }
  }

  // 3. Browser Tab
  const openBrowserTab = () => {
    const url = `${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=tab`
    window.open(url, '_blank')
  }

  // 4. Measurements Browser Tab
  const openMeasurementsTab = () => {
    const url = `${REQUEST_URL}/workflow?publicKey=${publicKey}&formId=${formId}&sm=${showMetrics ? 1 : 0}&flow=request`
    window.open(url, '_blank')
  }

  // 5. Embedded Form (iframe)
  const toggleEmbeddedForm = () => {
    setShowEmbeddedForm(!showEmbeddedForm)
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Procured Integration Tutorial
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Copy the exact embed codes below and paste them into your website
        </p>
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            <strong>Note:</strong> This is a test website demonstrating exactly what your users will experience when they copy-paste these embed codes.
          </p>
        </div>

        {/* Show Metrics Toggle - moved to top */}
        <div className="mb-8">
          <label className="inline-flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2">
            <input
              type="checkbox"
              checked={showMetrics}
              onChange={(e) => setShowMetrics(e.target.checked)}
              className="mr-3"
            />
            <span className="text-gray-700 font-medium">Show metrics on forms (affects embeds 1, 4, and 5)</span>
          </label>
        </div>
      </div>

      {/* Normal Request Form Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Normal Request Form</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 1. Standard Popup */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">1. Popup Modal</h3>
            <p className="text-sm text-gray-600 mb-4">Opens form in overlay modal</p>

            <div className="bg-gray-100 p-3 rounded mb-4 text-xs">
              <strong>Embed Code:</strong>
              <pre className="whitespace-pre-wrap mt-2">
{`<script src="${SDK_URL}/wvSdk.js"></script>
<script>
function openProcuredForm(){
  wvSdk.openModal({
    type:"wv-modal",
    publicKey:"${publicKey}",
    formId:"${formId}",
    showMetrics:${showMetrics ? 1 : 0}
  })
}
</script>`}
              </pre>
              <strong className="block mt-2">Example Usage:</strong>
              <pre className="mt-1">
{`<button onClick="openProcuredForm();">
  Request Quote
</button>`}
              </pre>
            </div>

            <button
              onClick={openStandardPopup}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Test Popup Modal
            </button>
          </div>

          {/* 2. Browser Tab */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-green-600">2. Browser Tab</h3>
            <p className="text-sm text-gray-600 mb-4">Opens form in new tab</p>

            <div className="bg-gray-100 p-3 rounded mb-4 text-xs">
              <strong>URL:</strong>
              <pre className="whitespace-pre-wrap mt-2 break-all">
{`${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=tab`}
              </pre>
              <strong className="block mt-2">Example Usage:</strong>
              <pre className="mt-1">
{`<button onclick="window.open('${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=tab', '_blank')">
  Get Quote
</button>`}
              </pre>
            </div>

            <button
              onClick={openBrowserTab}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
            >
              Test Browser Tab
            </button>
          </div>

          {/* 3. Embedded Form */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-600">3. Embedded Form</h3>
            <p className="text-sm text-gray-600 mb-4">Embed form directly in page</p>

            <div className="bg-gray-100 p-3 rounded mb-4 text-xs">
              <strong>Head Script:</strong>
              <pre className="whitespace-pre-wrap mt-2">
{`<script src="${SDK_URL}/wvFormSdk.js"></script>`}
              </pre>
              <strong className="block mt-2">HTML:</strong>
              <pre className="whitespace-pre-wrap mt-1">
{`<div class="procured-container">
  <iframe id="procured-iframe"
    src="${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=form"
    width="100%"
    height="100%"
    style="border:none">
  </iframe>
</div>`}
              </pre>
            </div>

            <button
              onClick={toggleEmbeddedForm}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
            >
              {showEmbeddedForm ? 'Hide' : 'Show'} Embedded
            </button>
          </div>
        </div>
      </div>

      {/* Request Form with Measurements Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Request Form with Measurements</h2>
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 4. Measurements Popup */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-orange-600">4. Measurements Popup</h3>
            <p className="text-sm text-gray-600 mb-4">Request with measurement tools in modal</p>

            <div className="bg-gray-100 p-3 rounded mb-4 text-xs">
              <strong>Embed Code:</strong>
              <pre className="whitespace-pre-wrap mt-2">
{`<script src="${SDK_URL}/wvSdk.js"></script>
<script>
function openProcuredForm(){
  wvSdk.openModal({
    type:"wv-instant-request-modal",
    publicKey:"${publicKey}",
    formId:"${formId}",
    showMetrics:${showMetrics ? 1 : 0}
  })
}
</script>`}
              </pre>
              <strong className="block mt-2">Example Usage:</strong>
              <pre className="mt-1">
{`<button onClick="openProcuredForm();">
  Get Quote
</button>`}
              </pre>
            </div>

            <button
              onClick={openMeasurementsPopup}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
            >
              Test Measurements Popup
            </button>
          </div>

          {/* 5. Measurements Tab */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-red-600">5. Measurements Tab</h3>
            <p className="text-sm text-gray-600 mb-4">Measurements in new browser tab</p>

            <div className="bg-gray-100 p-3 rounded mb-4 text-xs">
              <strong>URL:</strong>
              <pre className="whitespace-pre-wrap mt-2 break-all">
{`${REQUEST_URL}/workflow?publicKey=${publicKey}&formId=${formId}&sm=${showMetrics ? 1 : 0}&flow=request`}
              </pre>
              <strong className="block mt-2">Example Usage:</strong>
              <pre className="mt-1">
{`<button onclick="window.open('${REQUEST_URL}/workflow?publicKey=${publicKey}&formId=${formId}&sm=${showMetrics ? 1 : 0}&flow=request', '_blank')">
  Request with Measurements
</button>`}
              </pre>
            </div>

            <button
              onClick={openMeasurementsTab}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Test Measurements Tab
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Form Display */}
      {showEmbeddedForm && (
        <div className="border-2 border-purple-300 rounded-lg p-6">
          <h4 className="text-xl font-semibold mb-4 text-purple-600">Embedded Form Demo:</h4>
          <div className="procured-container" style={{height: '600px'}}>
            <iframe
              id="procured-iframe"
              src={`${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=form`}
              width="100%"
              height="100%"
              style={{border: 'none'}}
              title="Procured Embedded Form"
            />
          </div>
        </div>
      )}
    </div>
  )
}