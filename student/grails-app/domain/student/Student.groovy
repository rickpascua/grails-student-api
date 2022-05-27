package student

import grails.rest.*


@Resource(uri='/api/student', formats=['json'])
class Student {

    Long id
    String name
    String email
    String phone

    static constraints = {
        name size: 5..40, blank: false, unique: true
        email size: 5..30, blank: false
        phone size: 5..15, blank: false
    }

    static mapping = {
        version false
        table 'student'
        id column:'id', generator: 'native', params:[sequence:'student_seq']
    }
}
