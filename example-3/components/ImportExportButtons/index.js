import React from 'react';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

import { ElloButton, ElloSpace, ElloTooltip } from '@components';
import './styles.less';

function ImportExportButtons() {
  return (
    <ElloSpace className="my-garage-import-export-wrapper d-flex flex-row justify-content-end">
      <ElloTooltip title="Скачать шаблон">
        <ElloButton
          type="default"
          shape="round"
          icon={<UploadOutlined />}
          size="small"
        >
          XLS
        </ElloButton>
      </ElloTooltip>
      <ElloTooltip title="Импорт водителей">
        <ElloButton
          type="default"
          shape="round"
          icon={<DownloadOutlined />}
          size="small"
        >
          XLS
        </ElloButton>
      </ElloTooltip>
    </ElloSpace>
  );
}

export default ImportExportButtons;
