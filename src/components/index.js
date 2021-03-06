import ChartComponent from './chart/chart';
import GraphViewComponent from './graph-view/graph-view';
import GraphLineComponent from './graph-line/graph-line';
import GraphPreviewComponent from './graph-preview/graph-preview';
import ViewportPreviewComponent from './viewport-preview/viewport-preview';
import TogglerComponent from './toggler/toggler';
import TogglersShellComponent from './togglers-shell/togglers-shell';
import ChartShellComponent from './chart-shell/chart-shell';
import AxesComponent from './axes/axes';
import YAxisComponent from './y-axis/y-axis';
import XAxisComponent from './x-axis/x-axis';

customElements.define('graph-view', GraphViewComponent);
customElements.define('graph-line', GraphLineComponent);
customElements.define('chart-view', ChartComponent);
customElements.define('graph-preview', GraphPreviewComponent);
customElements.define('viewport-preview', ViewportPreviewComponent);
customElements.define('toggler-view', TogglerComponent);
customElements.define('togglers-shell', TogglersShellComponent);
customElements.define('chart-shell', ChartShellComponent);
customElements.define('axes-view', AxesComponent);
customElements.define('y-axis', YAxisComponent);
customElements.define('x-axis', XAxisComponent);
