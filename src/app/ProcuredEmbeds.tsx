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
      addScript: () => void;
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
  const [showMetrics, setShowMetrics] = useState(true)

  // Use the exact same embed code setup that users will copy-paste
  useEffect(() => {
    // This is the EXACT embed code users will use - no special React setup
    const script = document.createElement('script')
    script.src = `${SDK_URL}/wvSdk.js`
    document.head.appendChild(script)

    // Standard embed functions that users will have
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
      if (script.parentNode) {
        document.head.removeChild(script)
      }
    }
  }, [showMetrics])

  // 1. Standard Popup Modal - EXACT same as user embed code
  const openStandardPopup = () => {
    // This is exactly what users will have
    if (window.wvSdk) {
      window.wvSdk.openModal({
        type: "wv-modal",
        publicKey: publicKey,
        formId: formId,
        showMetrics: showMetrics ? 1 : 0
      })
    }
  }

  // 2. Measurements Popup Modal - EXACT same as user embed code
  const openMeasurementsPopup = () => {
    // This is exactly what users will have
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

        <div className="bg-blue-100 border border-blue-400 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>SDK Status:</strong> Using the real deployed SDK from sdk.procured.us. Check browser console for loading and modal debug info.
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

      {/* 1. Popup Modal */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">1. Popup Modal</h2>
          <p className="text-gray-600 mb-4">Opens form in overlay modal</p>

          <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
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
{`<button onclick="openProcuredForm();">Request Quote</button>`}
            </pre>
          </div>

          <button
            onClick={() => window.openProcuredForm && window.openProcuredForm()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Test Popup Modal
          </button>
        </div>
      </div>

      {/* 2. Browser Tab */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-3">2. Browser Tab</h2>
          <p className="text-gray-600 mb-4">Opens form in new tab</p>

          <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
            <strong>URL:</strong>
            <pre className="whitespace-pre-wrap mt-2 break-all">
{`${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=tab`}
            </pre>
            <strong className="block mt-2">Example Usage:</strong>
            <pre className="mt-1">
{`<button onclick="window.open('${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=tab', '_blank')">Get Quote</button>`}
            </pre>
          </div>

          <button
            onClick={openBrowserTab}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            Test Browser Tab
          </button>
        </div>
      </div>

      {/* 3. Embedded Form */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-3">3. Embedded Form</h2>
          <p className="text-gray-600 mb-4">Embed form directly in page</p>

          <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
            <strong>HTML:</strong>
            <pre className="whitespace-pre-wrap mt-2">
{`<div class="procured-container" style="height: 800px; overflow: auto;">
  <iframe id="procured-iframe"
    src="${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=form"
    width="100%"
    height="100%"
    style="border:none"
    scrolling="yes">
  </iframe>
</div>`}
            </pre>
            <p className="text-orange-600 text-xs mt-2">
              <strong>Note:</strong> Set container height to at least 800px to ensure full form visibility. Smaller heights will cut off the bottom of the form.
            </p>
          </div>

          <div className="border-2 border-purple-300 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-4 text-purple-600">Live Example:</h4>
            <div className="procured-container" style={{height: '800px', overflow: 'auto'}}>
              <iframe
                id="procured-iframe"
                src={`${FORMS_URL}/?formId=${formId}&publicKey=${publicKey}&mode=form`}
                width="100%"
                height="100%"
                style={{border: 'none'}}
                title="Procured Embedded Form"
                scrolling="yes"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Measurements Popup */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-3">4. Measurements Popup</h2>
          <p className="text-gray-600 mb-4">Request with measurement tools in modal</p>

          <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
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
{`<button onclick="openProcuredForm();">Get Quote with Measurements</button>`}
            </pre>
          </div>

          <button
            onClick={() => {
              // Temporarily override the function for measurements
              if (window.wvSdk) {
                window.wvSdk.openModal({
                  type: "wv-instant-request-modal",
                  publicKey: publicKey,
                  formId: formId,
                  showMetrics: showMetrics ? 1 : 0
                })
              }
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
          >
            Test Measurements Popup
          </button>
        </div>
      </div>

      {/* 5. Measurements Tab */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-3">5. Measurements Tab</h2>
          <p className="text-gray-600 mb-4">Measurements in new browser tab</p>

          <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
            <strong>URL:</strong>
            <pre className="whitespace-pre-wrap mt-2 break-all">
{`${REQUEST_URL}/workflow?publicKey=${publicKey}&formId=${formId}&sm=${showMetrics ? 1 : 0}&flow=request`}
            </pre>
            <strong className="block mt-2">Example Usage:</strong>
            <pre className="mt-1">
{`<button onclick="window.open('${REQUEST_URL}/workflow?publicKey=${publicKey}&formId=${formId}&sm=${showMetrics ? 1 : 0}&flow=request', '_blank')">Request with Measurements</button>`}
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
  )
}