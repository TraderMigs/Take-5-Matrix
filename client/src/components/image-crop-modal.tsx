import { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut, RotateCw, Save, X, Image, RefreshCw } from 'lucide-react';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onSave: (croppedImageSrc: string) => void;
}

function getInitialCrop(
  mediaWidth: number,
  mediaHeight: number,
): Crop {
  // Calculate centered crop area with proper aspect ratio
  const aspectRatio = 3 / 4; // Standard portrait aspect ratio
  const cropWidth = Math.min(mediaWidth * 0.8, mediaHeight * 0.6 / aspectRatio);
  const cropHeight = cropWidth * aspectRatio;
  
  // Center the crop area
  const x = (mediaWidth - cropWidth) / 2;
  const y = (mediaHeight - cropHeight) / 2;
  
  return {
    unit: 'px',
    x: Math.max(0, x),
    y: Math.max(0, y),
    width: cropWidth,
    height: cropHeight,
  };
}

export default function ImageCropModal({ isOpen, onClose, imageSrc, onSave }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(getInitialCrop(width, height));
  }, []);

  const getCroppedImg = useCallback(async () => {
    const image = imgRef.current;
    const canvas = canvasRef.current;
    const crop = completedCrop;

    if (!image || !canvas || !crop) {
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      crop.width * scaleX,
      crop.height * scaleY,
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );

    const blob = await offscreen.convertToBlob({
      type: 'image/jpeg',
      quality: 0.9,
    });

    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }, [completedCrop]);

  const handleSave = async () => {
    try {
      const croppedImageSrc = await getCroppedImg();
      if (croppedImageSrc) {
        onSave(croppedImageSrc);
        onClose();
      }
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const handleUseFullImage = () => {
    onSave(imageSrc);
    onClose();
  };

  const handleResetCrop = () => {
    const image = imgRef.current;
    if (image) {
      setCrop(getInitialCrop(image.width, image.height));
    }
  };

  const handleCropFullImage = () => {
    const image = imgRef.current;
    if (image) {
      setCrop({
        unit: 'px',
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[95vw] max-h-[95vh] p-6 bg-white dark:bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-black dark:text-white text-center text-lg font-semibold">Edit Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Instructions */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            Drag to position and resize the crop area
          </div>

          {/* Image Crop Area */}
          <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[300px]">
            <div className="w-full max-w-sm mx-auto flex justify-center">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                keepSelection
                className="flex justify-center"
              >
                <img
                  ref={imgRef}
                  alt="Crop preview"
                  src={imageSrc}
                  style={{ 
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    maxWidth: '280px',
                    maxHeight: '280px',
                    width: 'auto',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain'
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Zoom Control */}
            <div className="flex items-center space-x-4">
              <ZoomOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div className="flex-1">
                <Slider
                  value={[scale]}
                  onValueChange={(value) => setScale(value[0])}
                  max={3}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <ZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem]">
                {Math.round(scale * 100)}%
              </span>
            </div>

            {/* Rotation Control */}
            <div className="flex items-center space-x-4">
              <RotateCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div className="flex-1">
                <Slider
                  value={[rotate]}
                  onValueChange={(value) => setRotate(value[0])}
                  max={360}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem]">
                {rotate}°
              </span>
            </div>

            {/* Crop Controls */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleResetCrop}
                variant="outline"
                size="sm"
                className="text-black dark:text-white text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Reset
              </Button>
              <Button
                onClick={handleCropFullImage}
                variant="outline"
                size="sm"
                className="text-black dark:text-white text-xs"
              >
                <Image className="w-3 h-3 mr-1" />
                Crop Full Image
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                size="default"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 py-2"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleUseFullImage}
                size="default"
                className="bg-gray-500 hover:bg-gray-600 text-white py-2"
              >
                <Image className="w-4 h-4 mr-2" />
                Use Full
              </Button>
            </div>
            <Button
              onClick={handleSave}
              size="default"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Cropped Image
            </Button>
          </div>
        </div>

        {/* Hidden canvas for processing */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </DialogContent>
    </Dialog>
  );
}