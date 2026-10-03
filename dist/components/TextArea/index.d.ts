import { TextareaHTMLAttributes } from 'react';
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    hint?: string;
}
/**
 * The outlined text field, grown a few lines.
 *
 * Field's trick of floating the label into the border notch does not transfer:
 * a textarea's content starts at the top, so there is nowhere for a
 * vertically-centred label to rest. The label therefore sits in the notch from
 * the outset, which is the M3 behaviour for a populated field and reads
 * correctly for one that is about to be.
 */
export declare function TextArea({ label, error, hint, className, rows, ...props }: TextAreaProps): import("react").JSX.Element;
export {};
