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
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-auto bg-white dark:bg-gray-800">
        <DialogHeader className="bg-white dark:bg-black p-4 -m-6 mb-4 rounded-t-lg">
          <DialogTitle className="text-black dark:text-white">Edit Profile Photo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Instructions */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            Drag the crop area to position it anywhere on the image. Resize by dragging the corners or edges to crop any size you want.
          </div>

          {/* Image Crop Area */}
          <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[300px] overflow-hidden">
            <div className="w-full flex justify-center">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                keepSelection
                className="mx-auto"
              >
                <img
                  ref={imgRef}
                  alt="Crop preview"
                  src={imageSrc}
                  style={{ 
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    maxWidth: '400px',
                    maxHeight: '400px',
                    width: 'auto',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto'
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
            <div className="flex justify-center space-x-3">
              <Button
                onClick={handleResetCrop}
                variant="outline"
                size="sm"
                className="text-black dark:text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={handleCropFullImage}
                variant="outline"
                size="sm"
                className="text-black dark:text-white"
              >
                <Image className="w-4 h-4 mr-2" />
                Crop Full Image
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleUseFullImage}
              className="bg-slate-500 hover:bg-slate-600 text-white"
            >
              <Image className="w-4 h-4 mr-2" />
              Use Full Image
            </Button>
            <Button
              onClick={handleSave}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Cropped
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