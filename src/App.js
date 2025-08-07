import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Output from './Component/Output';
import Text from './Component/Controls/Text';
import Select from './Component/Controls/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [paras, setParas] = useState(4);
  const [html, setHtml] = useState(true);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Fetch text
  useEffect(() => {
    const fetchText = async () => {
      try {
        const format = html ? 'html' : 'text';
        const url = `https://baconipsum.com/api/?type=all-meat&paras=${paras}&format=${format}`;
        const res = await axios.get(url);

        if (Array.isArray(res.data)) {
          setText(res.data.join('<br/><br/>'));
        } else {
          setText(res.data);
        }
      } catch (err) {
        console.error('Error fetching text:', err);
      }
    };

    fetchText();
  }, [paras, html]);

  // Copy to clipboard
  const handleCopy = () => {
    const plainText = text.replace(/<[^>]+>/g, ''); // Remove HTML tags for clean copy
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Clear output
  const handleClear = () => {
    setText('');
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 main-card">
        <h1 className="text-center mb-3">ReactJS Sample Text Generator</h1>
        <hr />

        {/* Form Section */}
        <form className="row g-3 align-items-center mb-4 justify-content-center">
          <div className="col-auto">
            <label className="col-form-label">Paragraphs:</label>
          </div>
          <div className="col-auto">
            <Text value={paras} onChange={setParas} />
          </div>

          <div className="col-auto">
            <label className="col-form-label">Include HTML:</label>
          </div>
          <div className="col-auto">
            <Select value={html} onChange={setHtml} />
          </div>
        </form>

        {/* Output Section */}
        <div className="card mt-3 shadow-sm colorful-box">
          <div className="card-body rounded">
            <Output value={text} />
          </div>
          <div className="text-center mt-3 mb-3">
            <button className="btn btn-custom me-2" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button className="btn btn-clear" onClick={handleClear}>
              Clear Output
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
