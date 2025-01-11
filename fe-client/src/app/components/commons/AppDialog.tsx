import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';

type DialogProps = {
  title?: string;
  open: boolean;
  style?: any;
  className?: any;
  children: React.ReactNode;
  onClose: (data?: any) => void;
};

export default function AppDialog(props: DialogProps) {
  const { open, className, children, onClose, title, style } = props;
  const handleClickClose = () => {
    onClose(false);
  };

  return (
    <Dialog header={title} baseZIndex={1100} className={className} style={style} visible={open} onHide={() => handleClickClose()}>
      {children}
    </Dialog>
  );
}
