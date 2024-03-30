'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../ui/modal';
import { Button } from '../ui/button';

const AlertModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full justify-end pt-4 gap-3">
        <Button variant="outline" disabled={loading} onClick={onClose}>
          Cancle
        </Button>
        <Button
          type="submit"
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
        >
          {loading ? 'Loading' : 'Continue'}
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
