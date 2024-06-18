import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  CarOutline,
  UserOutline,
  FileTextOutline,
  ToolOutline
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline, CarOutline, UserOutline, FileTextOutline, ToolOutline];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}
