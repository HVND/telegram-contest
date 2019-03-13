import GraphViewComponent from './graph-view/graph-view';
import GraphLineComponent from './graph-line/graph-line';
import GraphPreviewComponent from './graph-preview/graph-preview';
import ViewportPreviewComponent from './viewport-preview/viewport-preview';
import ChartComponent from './chart/chart';

customElements.define('graph-view', GraphViewComponent);
customElements.define('graph-line', GraphLineComponent);
customElements.define('chart-view', ChartComponent);
customElements.define('graph-preview', GraphPreviewComponent);
customElements.define('viewport-preview', ViewportPreviewComponent);
