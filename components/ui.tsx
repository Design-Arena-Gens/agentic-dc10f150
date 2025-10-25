import { clsx } from 'clsx'
import { ReactNode } from 'react'

export function Section({ title, children, actions }: { title: string, children: ReactNode, actions?: ReactNode }) {
  return (
    <section className="card" aria-label={title}>
      <div className="card-header flex items-center justify-between">
        <span>{title}</span>
        {actions}
      </div>
      <div className="card-body">
        {children}
      </div>
    </section>
  )
}

export function Toggle({ label, checked, onChange, description }: { label: string, checked: boolean, onChange?: (v: boolean)=>void, description?: string }) {
  return (
    <label className="flex items-center gap-3" aria-label={label}>
      <button role="switch" aria-checked={checked} onClick={() => onChange?.(!checked)} className={clsx('w-11 h-6 rounded-full relative transition', checked ? 'bg-primary' : 'bg-gray-300')}>
        <span className={clsx('absolute top-0.5 transition left-0.5 w-5 h-5 rounded-full bg-white shadow', checked ? 'translate-x-5' : '')} />
      </button>
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        {description && <div className="text-xs text-gray-500">{description}</div>}
      </div>
    </label>
  )
}

export function Table({ headers, children }: { headers: string[], children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="table" role="table">
        <thead>
          <tr>
            {headers.map(h => <th key={h} scope="col">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
}

export function Badge({ color, children }: { color: 'success' | 'warning' | 'danger', children: ReactNode }) {
  const styles = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger'
  }[color]
  return <span className={clsx('badge', styles)}>{children}</span>
}

export function Input({ label, id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div>
      {label && <label htmlFor={id} className="label">{label}</label>}
      <input id={id} className="input" {...props} />
    </div>
  )
}

export function Textarea({ label, id, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div>
      {label && <label htmlFor={id} className="label">{label}</label>}
      <textarea id={id} className="input" {...props} />
    </div>
  )
}
