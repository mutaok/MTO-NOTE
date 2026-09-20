# Visual verification notes

- Initial 390x844 capture showed content and card spacing was mostly correct, but styled Pressable controls were collapsed because the template's NativeWind Pressable remap disabled `className` styling.
- Removed that remap so pill chips, calendar cells, quick actions, and FABs can render their intended spacing and surfaces.
- TypeScript passed after the icon compatibility fix.

## Final visual pass

After removing the Pressable remap and applying explicit chip/calendar sizing, the Android-sized preview renders correctly: filter chips have natural pill widths, the September calendar grid is evenly spaced, event cards align below it, notes are readable, and the FAB is visible above the bottom navigation. The dashboard and bottom navigation preserve the soft-blue active pill treatment.
