import React, { useEffect } from 'react';
import { Code2, Eye } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface CodeViewerProps {
  files: {
    name: string;
    code: string;
    language: string;
  }[];
}

export function CodeViewer({ files }: CodeViewerProps) {
  const [showCode, setShowCode] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(0);

  useEffect(() => {
    if (showCode) {
      Prism.highlightAll();
    }
  }, [showCode, selectedFile]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-2 px-4 py-2 bg-[#282a36] text-[#f8f8f2] rounded-lg shadow-lg hover:bg-[#44475a] transition-colors"
        >
          {showCode ? <Eye className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
          {showCode ? 'Preview' : 'View Code'}
        </button>
      </div>

      {showCode && (
        <div className="fixed inset-0 bg-[#282a36]/95 z-50 overflow-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="bg-[#282a36] rounded-lg shadow-xl">
              <div className="border-b border-[#44475a] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {files.map((file, index) => (
                      <button
                        key={file.name}
                        onClick={() => setSelectedFile(index)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedFile === index
                            ? 'bg-[#bd93f9] text-[#f8f8f2]'
                            : 'text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#44475a]'
                        }`}
                      >
                        {file.name}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowCode(false)}
                    className="text-[#6272a4] hover:text-[#f8f8f2]"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="overflow-auto p-4">
                <pre className="text-sm bg-[#282a36] rounded-lg !m-0">
                  <code className={`language-${files[selectedFile].language}`}>
                    {files[selectedFile].code}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Dracula Theme Overrides */
        :global(.token.comment),
        :global(.token.prolog),
        :global(.token.doctype),
        :global(.token.cdata) {
          color: #6272a4;
        }

        :global(.token.punctuation) {
          color: #f8f8f2;
        }

        :global(.token.property),
        :global(.token.tag),
        :global(.token.constant),
        :global(.token.symbol),
        :global(.token.deleted) {
          color: #ff79c6;
        }

        :global(.token.boolean),
        :global(.token.number) {
          color: #bd93f9;
        }

        :global(.token.selector),
        :global(.token.attr-name),
        :global(.token.string),
        :global(.token.char),
        :global(.token.builtin),
        :global(.token.inserted) {
          color: #50fa7b;
        }

        :global(.token.operator),
        :global(.token.entity),
        :global(.token.url),
        :global(.language-css .token.string),
        :global(.style .token.string),
        :global(.token.variable) {
          color: #f8f8f2;
        }

        :global(.token.atrule),
        :global(.token.attr-value),
        :global(.token.function),
        :global(.token.class-name) {
          color: #f1fa8c;
        }

        :global(.token.keyword) {
          color: #ff79c6;
        }

        :global(.token.regex),
        :global(.token.important) {
          color: #ffb86c;
        }

        :global(.token.important),
        :global(.token.bold) {
          font-weight: bold;
        }

        :global(.token.italic) {
          font-style: italic;
        }

        :global(.token.entity) {
          cursor: help;
        }
      `}</style>
    </div>
  );
}