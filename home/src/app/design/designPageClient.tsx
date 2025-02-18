"use client";

import { Design } from "@prisma/client";
import { useState } from "react";
import { Document, Page } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import PdfViewer from "@/features/designs/components/pdfViewer";
const DesignPageClient = ({ design }: { design: Design }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-semibold mb-4">{design.name}</h2>

      <div>
        <h1>PDF Viewer</h1>
        <PdfViewer fileUrl={design.pdfLink} />
      </div>
      {numPages && (
        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <Button
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, numPages))
            }
            disabled={pageNumber === numPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesignPageClient;
