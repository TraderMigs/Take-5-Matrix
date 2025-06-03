import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Database, FileSpreadsheet } from "lucide-react";
import { exportToPDF, exportToTXT, exportToJSON, exportToCSV } from "@/lib/diary-export";

interface DiaryExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: any[];
  userName?: string;
}

export default function DiaryExportModal({ isOpen, onClose, entries, userName }: DiaryExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'pdf' | 'txt' | 'json' | 'csv') => {
    if (entries.length === 0) {
      toast({
        title: "No entries to export",
        description: "Please create some diary entries first.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    try {
      switch (format) {
        case 'pdf':
          await exportToPDF(entries, userName);
          break;
        case 'txt':
          exportToTXT(entries, userName);
          break;
        case 'json':
          exportToJSON(entries, userName);
          break;
        case 'csv':
          exportToCSV(entries, userName);
          break;
      }

      toast({
        title: "Export successful",
        description: `Your diary has been exported as ${format.toUpperCase()}.`,
        className: "bg-green-800 border-green-700 text-white",
      });
      
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your diary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportOptions = [
    {
      id: 'pdf',
      title: 'PDF Document',
      description: 'Formatted document with styling',
      icon: FileText,
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      id: 'txt',
      title: 'Text File',
      description: 'Simple plain text format',
      icon: FileText,
      color: 'bg-gray-500 hover:bg-gray-600',
    },
    {
      id: 'json',
      title: 'JSON Data',
      description: 'Structured data format',
      icon: Database,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'csv',
      title: 'CSV Spreadsheet',
      description: 'Excel-compatible format',
      icon: FileSpreadsheet,
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Diary
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose how you'd like to export your {entries.length} diary entries:
          </p>
          
          <div className="space-y-3">
            {exportOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={option.id}
                  onClick={() => handleExport(option.id as any)}
                  disabled={isExporting}
                  className={`w-full ${option.color} text-white p-4 h-auto justify-start`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">{option.title}</div>
                      <div className="text-sm opacity-90">{option.description}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600"
              disabled={isExporting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}