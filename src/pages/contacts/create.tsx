import { z as zod } from 'zod'
import { useRouter } from 'next/router'
import { useForm, zodResolver, formList } from '@mantine/form'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useMediaQuery } from '@mantine/hooks'
import TextEditor from '@/components/Inputs/TextEditor'
import AppLayout from '@/components/Layouts/AppLayout'
import { DatePicker } from '@mantine/dates'
import 'dayjs/locale/uk'
import {
  InputWrapper,
  ActionIcon,
  SimpleGrid,
  TextInput,
  Container,
  Center,
  Select,
  Button,
  Group,
  Code,
  Box,
  createStyles,
} from '@mantine/core'
import {
  GripVertical,
  Calendar,
  Plus,
  Home,
  Phone,
  At,
  X,
} from 'tabler-icons-react'
import {
  resetServerContext,
  DragDropContext,
  Draggable,
  Droppable,
} from '@react-forked/dnd'

const useStyles = createStyles(theme => ({
  editor: {
    qlTooltip: {
      zIndex: 100,
    },
  },
}))

const schema = zod.object({
  name: zod.string().min(2, { message: 'Name should have at least 2 letters' }),
  company: zod.string(),
  emails: zod.array(
    zod.object({ email: zod.string().email({ message: 'Invalid email' }) }),
  ),
  phones: zod.array(zod.object({ phone: zod.string() })),
  status: zod.enum(['lead', 'client']),
  birthday: zod.date(),
  about: zod.string(),
})

const ContactsCreate = () => {
  const { classes } = useStyles()
  const isMobile = useMediaQuery('(max-width: 755px)', false)
  const { locale } = useRouter()
  const { t } = useTranslation('crm')

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
      company: '',
      emails: formList([{ email: '' }]),
      phones: formList([{ phone: '' }]),
      status: 'lead',
      birthday: null,
      about: '',
    },
  })

  resetServerContext()

  const emails = form.values.emails.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {provided => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <GripVertical size={18} />
          </Center>
          <TextInput
            placeholder="client@email.com"
            icon={<At size={14} />}
            required
            sx={{ flex: 1 }}
            {...form.getListInputProps('emails', index, 'email')}
          />
          <ActionIcon
            color="red"
            variant="hover"
            onClick={() => form.removeListItem('emails', index)}>
            <X size={16} />
          </ActionIcon>
        </Group>
      )}
    </Draggable>
  ))

  const phones = form.values.phones.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {provided => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <GripVertical size={18} />
          </Center>
          <TextInput
            required
            icon={<Phone size={14} />}
            placeholder="+380500000000"
            sx={{ flex: 1 }}
            {...form.getListInputProps('phones', index, 'phone')}
          />
          <ActionIcon
            color="red"
            variant="hover"
            onClick={() => form.removeListItem('phones', index)}>
            <X size={16} />
          </ActionIcon>
        </Group>
      )}
    </Draggable>
  ))

  return (
    <AppLayout header={<h2>{t('Create contact')}</h2>}>
      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <Box sx={{ maxWidth: 600, spacing: 30 }}>
          <SimpleGrid cols={2}>
            <TextInput
              required
              mb="sm"
              label={t('Full name')}
              placeholder={t('Full name')}
              {...form.getInputProps('name')}
            />
            <Select
              label={t('Status')}
              placeholder={t('Status')}
              data={[
                { value: 'lead', label: t('Lead') },
                { value: 'client', label: t('Client') },
              ]}
              {...form.getInputProps('status')}
            />
          </SimpleGrid>

          <TextInput
            mb="sm"
            label={t('Company')}
            placeholder={t('Company name')}
            icon={<Home size={16} />}
            {...form.getInputProps('company')}
          />

          <InputWrapper
            mb="sm"
            label={t('Contact emails')}
            styles={{
              description: { marginBottom: 0 },
            }}
            description={t('Add as many emails as you need')}
            error={form.errors.email && 'Invalid emails'}>
            <DragDropContext
              onDragEnd={({ destination, source }) =>
                form.reorderListItem('emails', {
                  from: source.index,
                  to: destination?.index ?? source.index,
                })
              }>
              <Droppable droppableId="emails-list" direction="vertical">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {emails}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <Button
              mt="xs"
              variant="outline"
              color="gray"
              leftIcon={<Plus size={16} />}
              onClick={() => form.addListItem('emails', { email: '' })}>
              {t('Add email', { ns: 'actions' })}
            </Button>
          </InputWrapper>

          <InputWrapper
            mb="sm"
            label={t('Contact phones')}
            styles={{
              description: { marginBottom: 0 },
            }}
            description={t(
              'Please specify country code for better compatibility',
            )}
            error={form.errors.phones && 'Invalid phones'}>
            <DragDropContext
              onDragEnd={({ destination, source }) =>
                form.reorderListItem('phones', {
                  from: source.index,
                  to: destination?.index ?? source.index,
                })
              }>
              <Droppable droppableId="phones-list" direction="vertical">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {phones}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <Button
              mt="xs"
              variant="outline"
              color="gray"
              leftIcon={<Plus size={16} />}
              onClick={() => form.addListItem('phones', { phone: '' })}>
              {t('Add phone', { ns: 'actions' })}
            </Button>
          </InputWrapper>

          <DatePicker
            locale={locale}
            allowFreeInput={!isMobile}
            firstDayOfWeek={locale === 'uk' ? 'monday' : 'sunday'}
            placeholder={t('Select birthday')}
            label={t('Date of birth')}
            icon={<Calendar size={16} />}
            dropdownType={isMobile ? 'modal' : 'popover'}
            {...form.getInputProps('birthday')}
          />

          <InputWrapper
            mt="sm"
            label={t('About client')}
            description={t('Can be used as a draft')}>
            <Container mt="xs" px={0}>
              <TextEditor
                className={classes.editor}
                sticky={true}
                stickyOffset={75}
                controls={[
                  ['bold', 'italic', 'underline', 'clean'],
                  ['link', 'orderedList', 'unorderedList'],
                  ['alignLeft', 'alignCenter', 'alignRight'],
                  ['h1', 'h2', 'h3', 'blockquote'],
                  ['sup', 'sub'],
                ]}
                {...form.getInputProps('about')}
              />
            </Container>
          </InputWrapper>

          <Group mt="xl">
            <Button type="submit">{t('Create', { ns: 'actions' })}</Button>
          </Group>
        </Box>
      </form>
    </AppLayout>
  )
}

export default ContactsCreate

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crm', 'actions'])),
  },
})
