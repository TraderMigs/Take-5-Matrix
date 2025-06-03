import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
}

export const exportToPDF = async (entries: DiaryEntry[], userName?: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Add title
  pdf.setFontSize(20);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Take 5 - Private Diary', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += lineHeight * 2;

  if (userName) {
    pdf.setFontSize(12);
    pdf.text(`User: ${userName}`, margin, yPosition);
    yPosition += lineHeight;
  }

  pdf.setFontSize(10);
  pdf.text(`Exported on: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += lineHeight * 2;

  // Add entries
  entries.forEach((entry, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    // Entry header
    pdf.setFontSize(14);
    pdf.setTextColor(0, 100, 100);
    const title = entry.title || `Entry ${index + 1}`;
    pdf.text(title, margin, yPosition);
    yPosition += lineHeight;

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    const date = new Date(entry.createdAt).toLocaleDateString();
    pdf.text(`Date: ${date}`, margin, yPosition);
    yPosition += lineHeight;

    if (entry.mood) {
      pdf.text(`Mood: ${entry.mood}`, margin, yPosition);
      yPosition += lineHeight;
    }

    yPosition += lineHeight / 2;

    // Entry content
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    const splitContent = pdf.splitTextToSize(entry.content, pageWidth - (margin * 2));
    
    splitContent.forEach((line: string) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    yPosition += lineHeight * 2; // Space between entries
  });

  // Save the PDF
  const fileName = `Take5-Diary-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

export const exportToTXT = (entries: DiaryEntry[], userName?: string) => {
  let content = 'Take 5 - Private Diary\n';
  content += '========================\n\n';
  
  if (userName) {
    content += `User: ${userName}\n`;
  }
  
  content += `Exported on: ${new Date().toLocaleDateString()}\n\n`;
  content += '------------------------\n\n';

  entries.forEach((entry, index) => {
    const title = entry.title || `Entry ${index + 1}`;
    content += `${title}\n`;
    content += `Date: ${new Date(entry.createdAt).toLocaleDateString()}\n`;
    
    if (entry.mood) {
      content += `Mood: ${entry.mood}\n`;
    }
    
    content += '\n';
    content += entry.content;
    content += '\n\n';
    content += '------------------------\n\n';
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Take5-Diary-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToJSON = (entries: DiaryEntry[], userName?: string) => {
  const exportData = {
    exportedBy: 'Take 5 Mental Wellness App',
    user: userName || 'Anonymous',
    exportDate: new Date().toISOString(),
    entriesCount: entries.length,
    entries: entries.map(entry => ({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      createdAt: entry.createdAt,
    }))
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Take5-Diary-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (entries: DiaryEntry[], userName?: string) => {
  let csvContent = 'Title,Date,Mood,Content\n';
  
  entries.forEach(entry => {
    const title = (entry.title || '').replace(/"/g, '""');
    const date = new Date(entry.createdAt).toLocaleDateString();
    const mood = (entry.mood || '').replace(/"/g, '""');
    const content = entry.content.replace(/"/g, '""').replace(/\n/g, ' ');
    
    csvContent += `"${title}","${date}","${mood}","${content}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Take5-Diary-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};