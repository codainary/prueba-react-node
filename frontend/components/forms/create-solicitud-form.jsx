'use client'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { CustomField } from '@/components/custom-field'
import { SubmitButton } from '@/components/submit-button'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { createSolicitudSchema } from '@/schemas'
import { useAuth } from '@/contexts/AuthContext'
import { useSolicitudes } from '@/contexts/SolicitudesContext'

export const CreateSolicitudForm = () => {
    const { authToken } = useAuth()
    const { setSolicitudes } = useSolicitudes()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(null)
    const [submitSuccess, setSubmitSuccess] = useState(null)
    const [employees, setEmployees] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(createSolicitudSchema),
        defaultValues: {
            codigo: 'RN3000',
            empleadoId: '',
            resumen: 'https://www.linkedin.com/in/devpreira/',
            descripcion: 'Este es una descripcion de ejemplo. ',
        },
    })

    useEffect(() => {
        const fetchEmployees = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get('/empleados', {
                    headers: { Authorization: `Bearer ${authToken}` },
                })
                setEmployees(response.data)
            } catch (error) {
                console.error('Error fetching employees:', error)
                setSubmitError('Error al cargar la lista de empleados.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchEmployees()
    }, [authToken])

    // Maneja el cambio de empleado seleccionado
    const handleEmployeeChange = (value) => {
        form.setValue('codigo', value)
        form.setValue('empleadoId', value)
    }

    const onSubmit = async (values) => {
        setIsSubmitting(true)
        setSubmitError(null)
        setSubmitSuccess(null)

        try {
            const response = await axios.post(
                '/solicitudes',
                {
                    codigo: values.codigo,
                    descripcion: values.descripcion,
                    empleadoId: parseInt(values.empleadoId),
                    resumen: values.empleadoId,
                },
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            )
            setSubmitSuccess('Solicitud creada exitosamente.')

            // Actualizar la lista de solicitudes en el contexto global
            const updatedSolicitudes = await axios.get('/solicitudes', {
                headers: { Authorization: `Bearer ${authToken}` },
            })
            setSolicitudes(updatedSolicitudes.data)
        } catch (error) {
            setSubmitError(
                'Error al crear la solicitud. Por favor intenta nuevamente.'
            )
            console.error('Error creating solicitud:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    fieldType="input"
                    control={form.control}
                    name="codigo"
                    label="Código"
                    placeholder="Asigne un código a la solicitud"
                />

                <CustomField
                    control={form.control}
                    fieldType="select"
                    name="empleadoId"
                    label="Seleccionar Empleado"
                    placeholder="Escoge un empleado"
                    options={employees.map((empleado) => ({
                        value: empleado.id.toString(),
                        label: empleado.nombre,
                    }))}
                    onChange={handleEmployeeChange}
                />

                <CustomField
                    fieldType="input"
                    control={form.control}
                    name="resumen"
                    label="Resumen"
                    placeholder="Ingrese la URL dónde reposa el resumen"
                />

                <CustomField
                    control={form.control}
                    fieldType="textarea"
                    name="descripcion"
                    label="Descripción"
                    placeholder="Ingresar descripción aquí..."
                />

                {submitError && <FormError message={submitError} />}
                {submitSuccess && <FormSuccess message={submitSuccess} />}

                <SubmitButton isLoading={isSubmitting}>
                    Crear solicitud
                </SubmitButton>
            </form>
        </Form>
    )
}
