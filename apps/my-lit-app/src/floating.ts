import { MiddlewareState, platform, Placement, arrow, autoPlacement, computePosition, hide, offset, shift, size } from '@floating-ui/dom';

const middleware = [
  offset({ mainAxis: 0, crossAxis: 0 }),
  offset(0),
  autoPlacement({ allowedPlacements: ['bottom-start', 'top-end', 'bottom-end', 'top-start'] }),
  shift(),
  hide({
    strategy: 'referenceHidden' // 'referenceHidden' by default
  })
];

export function useFloatingUI(trigger:HTMLElement,panel:HTMLElement):void{

void computePosition(trigger, panel, {
  middleware: middleware,
  strategy:'fixed'
}).then(({ x, y,middlewareData }) => {
  const referenceHidden = middlewareData?.hide?.referenceHidden;
  Object.assign(panel.style, {
    left: `0px`,
    top: `0px`,
    transform: `translate(${x}px, ${y}px)`,
    display:referenceHidden ? 'none' : 'block'
  })
});
}