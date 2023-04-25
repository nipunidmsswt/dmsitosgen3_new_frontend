import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useEffect } from 'react';

export default function PositionDemo() {
    const toast = useRef(null);
    const position = 'top-right';
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    useEffect(() => {
        const confirm = () => {
            confirmDialog({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                position,
                accept,
                reject
            });
        };
        confirm();
    }, []);

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            {/* <div className="flex flex-wrap justify-content-center gap-2 mb-2">
                <Button
                    label="Left"
                    icon="pi pi-arrow-right"
                    onClick={() => confirm('left')}
                    className="p-button-help"
                    style={{ minWidth: '10rem' }}
                />
                <Button
                    label="Right"
                    icon="pi pi-arrow-left"
                    onClick={() => confirm('right')}
                    className="p-button-help"
                    style={{ minWidth: '10rem' }}
                />
            </div> */}
            {/* <div className="flex flex-wrap justify-content-center gap-2 mb-2">
                <Button
                    label="TopLeft"
                    icon="pi pi-arrow-down-right"
                    onClick={() => confirm('top-left')}
                    className="p-button-warning"
                    style={{ minWidth: '10rem' }}
                />
                <Button
                    label="Top"
                    icon="pi pi-arrow-down"
                    onClick={() => confirm('top')}
                    className="p-button-warning"
                    style={{ minWidth: '10rem' }}
                />
                <Button
                    label="TopRight"
                    icon="pi pi-arrow-down-left"
                    onClick={() => confirm('top-right')}
                    className="p-button-warning"
                    style={{ minWidth: '10rem' }}
                />
            </div> */}
            {/* <div className="flex flex-wrap justify-content-center gap-2">
                <Button
                    label="BottomLeft"
                    icon="pi pi-arrow-up-right"
                    onClick={() => confirm('bottom-left')}
                    className="p-button-success"
                    style={{ minWidth: '10rem' }}
                />
                <Button
                    label="Bottom"
                    icon="pi pi-arrow-up"
                    onClick={() => confirm('bottom')}
                    className="p-button-success"
                    style={{ minWidth: '10rem' }}
                />
                <Button
                    label="BottomRight"
                    icon="pi pi-arrow-up-left"
                    onClick={() => confirm('bottom-right')}
                    className="p-button-success"
                    style={{ minWidth: '10rem' }}
                />
            </div> */}
        </div>
    );
}
